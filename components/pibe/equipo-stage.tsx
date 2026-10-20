"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { equipos, type EquipoId } from "@/lib/pibe";

/*
 * Escena 3D de los equipos (la carga components/pibe/equipos.tsx solo en el cliente y cerca
 * de la pantalla). Geometría armada a mano con primitivas: sin modelos para descargar. Las
 * piezas repetidas (tubos, perfiles, celdas) van instanciadas, una llamada de dibujo cada
 * familia. Se dibuja a demanda: quieta no gasta nada.
 */

type V3 = [number, number, number];
type Segment = { a: V3; b: V3; r: number };

const UP = new THREE.Vector3(0, 1, 0);
const unitCyl = new THREE.CylinderGeometry(1, 1, 1, 20, 1);
const unitBox = new THREE.BoxGeometry(1, 1, 1);

/** Un InstancedMesh por familia de piezas: cada segmento es un cilindro o perfil de a a b. */
function Segments({
  segments,
  shape,
  material,
}: {
  segments: Segment[];
  shape: "cyl" | "box";
  material: THREE.Material;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const mid = new THREE.Vector3();
    const s = new THREE.Vector3();
    segments.forEach((seg, i) => {
      a.set(...seg.a);
      b.set(...seg.b);
      dir.subVectors(b, a);
      const len = dir.length();
      q.setFromUnitVectors(UP, dir.normalize());
      mid.addVectors(a, b).multiplyScalar(0.5);
      const w = shape === "cyl" ? seg.r : seg.r * 2;
      s.set(w, len, w);
      m.compose(mid, q, s);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [segments, shape]);
  return <instancedMesh ref={ref} args={[shape === "cyl" ? unitCyl : unitBox, material, segments.length]} castShadow />;
}

function range(n: number, from: number, to: number) {
  return Array.from({ length: n }, (_, i) => from + ((to - from) * i) / (n - 1));
}

function useMaterials() {
  return useMemo(
    () => ({
      aluminium: new THREE.MeshStandardMaterial({
        color: "#c7ccd4",
        metalness: 0.85,
        roughness: 0.32,
      }),
      steel: new THREE.MeshStandardMaterial({
        color: "#e3e7ec",
        metalness: 0.9,
        roughness: 0.22,
      }),
      steelDark: new THREE.MeshStandardMaterial({
        color: "#9aa3ae",
        metalness: 0.85,
        roughness: 0.35,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#eef5ff",
        metalness: 0,
        roughness: 0.04,
        transparent: true,
        opacity: 0.32,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.6,
        depthWrite: false,
      }),
      absorber: new THREE.MeshStandardMaterial({
        color: "#1a2742",
        metalness: 0.55,
        roughness: 0.3,
      }),
      copper: new THREE.MeshStandardMaterial({
        color: "#b8733f",
        metalness: 0.9,
        roughness: 0.3,
      }),
      casing: new THREE.MeshStandardMaterial({
        color: "#eceff3",
        metalness: 0.2,
        roughness: 0.45,
      }),
      cell: new THREE.MeshPhysicalMaterial({
        color: "#0f2148",
        metalness: 0.3,
        roughness: 0.35,
        clearcoat: 0.45,
        clearcoatRoughness: 0.2,
        envMapIntensity: 0.4,
      }),
      cellBed: new THREE.MeshStandardMaterial({
        color: "#16233b",
        metalness: 0,
        roughness: 0.8,
      }),
      backsheet: new THREE.MeshStandardMaterial({
        color: "#f2f4f7",
        metalness: 0,
        roughness: 0.7,
      }),
      black: new THREE.MeshStandardMaterial({
        color: "#1b1d21",
        metalness: 0.2,
        roughness: 0.5,
      }),
      // La terraza: un azul noche apenas más claro que el fondo de la sección.
      roof: new THREE.MeshStandardMaterial({
        color: "#12294c",
        metalness: 0,
        roughness: 0.95,
      }),
      parapet: new THREE.MeshStandardMaterial({
        color: "#173360",
        metalness: 0,
        roughness: 0.95,
      }),
    }),
    [],
  );
}
type Mats = ReturnType<typeof useMaterials>;

/* ----------------------------- Modelos ----------------------------- */

/** Tubos de vacío entre el borde de arriba y el de abajo del plano colector. */
function vacuumTubes(top: [number, number], bottom: [number, number], n = 14) {
  const xs = range(n, -0.9, 0.9);
  const outer: Segment[] = xs.map((x) => ({
    a: [x, top[0], top[1]],
    b: [x, bottom[0], bottom[1]],
    r: 0.043,
  }));
  const inner: Segment[] = xs.map((x) => ({
    a: [x, top[0] - 0.02, top[1] + 0.02],
    b: [x, bottom[0] + 0.03, bottom[1] - 0.03],
    r: 0.027,
  }));
  return { outer, inner };
}

function frameFor(topY: number, topZ: number, legZ: number): Segment[] {
  const r = 0.022;
  const side = [-1.02, 1.02];
  return [
    ...side.map((x) => ({
      a: [x, topY, topZ] as V3,
      b: [x, 0.05, 0.94] as V3,
      r,
    })),
    ...side.map((x) => ({
      a: [x, 0, legZ] as V3,
      b: [x, topY - 0.02, legZ] as V3,
      r,
    })),
    ...side.map((x) => ({
      a: [x, 0.02, legZ - 0.04] as V3,
      b: [x, 0.02, 0.98] as V3,
      r,
    })),
    { a: [-1.04, 0.08, 0.92], b: [1.04, 0.08, 0.92], r },
    { a: [-1.04, 0.02, legZ], b: [1.04, 0.02, legZ], r },
    // diagonales de atrás
    { a: [-1.02, 0.05, legZ], b: [1.02, topY - 0.1, legZ], r: 0.012 },
    { a: [1.02, 0.05, legZ], b: [-1.02, topY - 0.1, legZ], r: 0.012 },
  ];
}

function Paneles({ m }: { m: Mats }) {
  // Dos paneles de 6 × 10 celdas, inclinados 30°.
  const tilt = Math.PI / 6;
  const len = 1.7;
  const width = 1.0;
  const top: V3 = [0, 1.05, -0.35];
  const center: V3 = [0, top[1] - (Math.sin(tilt) * len) / 2, top[2] + (Math.cos(tilt) * len) / 2];
  const cells = useMemo(() => {
    const out: THREE.Matrix4[] = [];
    const pitch = 0.162;
    for (const px of [-0.53, 0.53])
      for (let c = 0; c < 6; c++)
        for (let r = 0; r < 10; r++) {
          const s = new THREE.Matrix4().makeScale(0.152, 0.006, 0.152);
          out.push(s.setPosition(px + (c - 2.5) * pitch, 0.012, (r - 4.5) * pitch));
        }
    return out;
  }, []);
  const cellRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = cellRef.current;
    if (!mesh) return;
    cells.forEach((mat, i) => mesh.setMatrixAt(i, mat));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [cells]);
  const legs = useMemo<Segment[]>(
    () => [
      ...[-1.0, 0, 1.0].map((x) => ({
        a: [x, 0, -0.29] as V3,
        b: [x, 1.0, -0.29] as V3,
        r: 0.022,
      })),
      ...[-1.0, 0, 1.0].map((x) => ({
        a: [x, 0, 1.12] as V3,
        b: [x, 0.2, 1.12] as V3,
        r: 0.022,
      })),
      ...[-1.0, 0, 1.0].map((x) => ({
        a: [x, 0.02, -0.35] as V3,
        b: [x, 0.02, 1.14] as V3,
        r: 0.022,
      })),
    ],
    [],
  );
  return (
    <group>
      <group position={center} rotation={[tilt, 0, 0]}>
        {[-0.53, 0.53].map((px) => (
          <group key={px} position={[px, 0, 0]}>
            {/* lámina de atrás */}
            <mesh material={m.backsheet} castShadow>
              <boxGeometry args={[width, 0.02, len]} />
            </mesh>
            {/* marco de aluminio */}
            {[
              [0, 0.02, len / 2 - 0.02, width, 0.045, 0.04],
              [0, 0.02, -len / 2 + 0.02, width, 0.045, 0.04],
              [width / 2 - 0.02, 0.02, 0, 0.04, 0.045, len],
              [-width / 2 + 0.02, 0.02, 0, 0.04, 0.045, len],
            ].map(([x, y, z, w, h, d], i) => (
              <mesh key={i} position={[x, y, z]} material={m.aluminium} castShadow>
                <boxGeometry args={[w, h, d]} />
              </mesh>
            ))}
            {/* caja de conexión, atrás */}
            {px > 0 && (
              <mesh position={[0, -0.04, -0.42]} material={m.black}>
                <boxGeometry args={[0.16, 0.04, 0.12]} />
              </mesh>
            )}
          </group>
        ))}
        {/* fondo oscuro entre celdas, para que el frente se lea azul y no plateado */}
        {[-0.53, 0.53].map((px) => (
          <mesh key={px} position={[px, 0.0105, 0]} material={m.cellBed}>
            <boxGeometry args={[width - 0.06, 0.002, len - 0.06]} />
          </mesh>
        ))}
        <instancedMesh ref={cellRef} args={[unitBox, m.cell, cells.length]} />
      </group>
      <Segments segments={legs} shape="box" material={m.aluminium} />
    </group>
  );
}

function Atmosferico({ m }: { m: Mats }) {
  const tubes = useMemo(() => vacuumTubes([1.24, -0.22], [0.1, 0.9]), []);
  const frame = useMemo(() => frameFor(1.24, -0.22, -0.36), []);
  return (
    <group>
      {/* Tanque horizontal de acero inoxidable */}
      <mesh position={[0, 1.42, -0.36]} rotation={[0, 0, Math.PI / 2]} material={m.steel} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 2.1, 48]} />
      </mesh>
      {[-1.06, 1.06].map((x) => (
        <mesh key={x} position={[x, 1.42, -0.36]} rotation={[0, 0, Math.PI / 2]} material={m.steelDark} castShadow>
          <cylinderGeometry args={[0.245, 0.245, 0.03, 48]} />
        </mesh>
      ))}
      {[-0.7, 0.7].map((x) => (
        <mesh key={x} position={[x, 1.2, -0.36]} material={m.aluminium} castShadow>
          <boxGeometry args={[0.05, 0.08, 0.5]} />
        </mesh>
      ))}
      <Segments segments={tubes.inner} shape="cyl" material={m.absorber} />
      <Segments segments={tubes.outer} shape="cyl" material={m.glass} />
      <Segments segments={frame} shape="box" material={m.aluminium} />
    </group>
  );
}

function Presurizado({ m }: { m: Mats }) {
  const tubes = useMemo(() => vacuumTubes([1.2, -0.14], [0.1, 0.9]), []);
  const frame = useMemo(() => frameFor(1.22, -0.16, -0.3), []);
  const pipes = useMemo<Segment[]>(
    () => [
      { a: [-1.05, 1.34, -0.18], b: [-1.28, 1.34, -0.18], r: 0.022 },
      { a: [-1.28, 1.34, -0.18], b: [-1.28, 0.04, -0.18], r: 0.022 },
      { a: [-1.05, 1.24, -0.32], b: [-1.2, 1.24, -0.32], r: 0.022 },
      { a: [-1.2, 1.24, -0.32], b: [-1.2, 0.04, -0.32], r: 0.022 },
    ],
    [],
  );
  return (
    <group>
      {/* Cabezal colector aislado */}
      <mesh position={[0, 1.3, -0.24]} material={m.casing} castShadow>
        <boxGeometry args={[2.1, 0.2, 0.26]} />
      </mesh>
      <mesh position={[0, 1.3, -0.11]} material={m.steelDark}>
        <boxGeometry args={[2.1, 0.035, 0.005]} />
      </mesh>
      <Segments segments={tubes.inner} shape="cyl" material={m.copper} />
      <Segments segments={tubes.outer} shape="cyl" material={m.glass} />
      <Segments segments={frame} shape="box" material={m.aluminium} />
      <Segments segments={pipes} shape="cyl" material={m.copper} />
    </group>
  );
}

const MODELS: Record<EquipoId, (p: { m: Mats }) => React.JSX.Element> = {
  paneles: Paneles,
  atmosferico: Atmosferico,
  presurizado: Presurizado,
};

/** El pedazo de terraza donde apoya el equipo, con un murete atrás. */
function Terrace({ m }: { m: Mats }) {
  return (
    <group position={[0, 0, 0.25]}>
      <mesh position={[0, -0.05, 0]} material={m.roof} receiveShadow>
        <boxGeometry args={[3.2, 0.1, 2.7]} />
      </mesh>
      <mesh position={[0, 0.16, -1.29]} material={m.parapet}>
        <boxGeometry args={[3.2, 0.32, 0.12]} />
      </mesh>
    </group>
  );
}

/* ------------------------- Puesta en escena ------------------------- */

/** Gira el equipo hacia `yaw` con amortiguación y entra con un giro corto al cambiar. */
function Turntable({
  yaw,
  id,
  reduced,
  children,
}: {
  yaw: number;
  id: EquipoId;
  reduced: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const current = useRef({
    yaw: yaw - (reduced ? 0 : 0.7),
    scale: reduced ? 1 : 0.94,
  });
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (!reduced) current.current = { yaw: yaw - 0.7, scale: 0.94 };
    invalidate();
    // Solo al cambiar de equipo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => invalidate(), [yaw, invalidate]);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const c = current.current;
    const k = reduced ? 1 : 1 - Math.exp(-7 * Math.min(dt, 0.05));
    c.yaw += (yaw - c.yaw) * k;
    c.scale += (1 - c.scale) * k;
    const moved = g.rotation.y !== c.yaw || g.scale.x !== c.scale;
    g.rotation.y = c.yaw;
    g.scale.setScalar(c.scale);
    // Un cuadro más después de moverse, para que los puntos numerados terminen de ubicarse
    // junto al equipo (pasa con el giro de un salto, con movimiento reducido).
    if (moved || Math.abs(yaw - c.yaw) > 0.0005 || 1 - c.scale > 0.0005) invalidate();
  });

  return <group ref={ref}>{children}</group>;
}

/**
 * Ubica los puntos numerados (botones comunes, encima del canvas) en la pantalla: en cada
 * cuadro proyecta la posición de cada parte con la matriz del equipo y los mueve con
 * transform. Los del lado que no se ve quedan ocultos. Sin Html de drei: cada uno era su
 * propia raíz de React y el modo estricto la dejaba vacía.
 */
function Projector({
  id,
  model,
  dots,
  yaw,
}: {
  id: EquipoId;
  model: React.RefObject<THREE.Group | null>;
  dots: React.RefObject<(HTMLButtonElement | null)[]>;
  yaw: number;
}) {
  const parts = equipos.find((e) => e.id === id)!.parts;
  const fromBack = Math.cos(yaw) < 0;
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    const g = model.current;
    if (!g) return;
    g.updateWorldMatrix(true, false);
    parts.forEach((p, i) => {
      const el = dots.current[i];
      if (!el) return;
      v.set(...p.pos)
        .applyMatrix4(g.matrixWorld)
        .project(camera);
      el.style.transform = `translate3d(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px, 0) translate(-50%, -50%)`;
      el.hidden = !!p.back !== fromBack;
    });
  });
  return null;
}

function Controls({ resetKey }: { resetKey: number }) {
  const ref = useRef<OrbitControlsImpl>(null);
  useEffect(() => {
    ref.current?.saveState();
  }, []);
  useEffect(() => {
    if (resetKey > 0) ref.current?.reset();
  }, [resetKey]);
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      target={[0, 0.5, 0.2]}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.09}
      rotateSpeed={0.7}
      minPolarAngle={0.55}
      maxPolarAngle={1.4}
    />
  );
}

export type StageProps = {
  id: EquipoId;
  activePart: number;
  onPart: (i: number) => void;
  yaw: number;
  resetKey: number;
  reduced: boolean;
  onFail: () => void;
};

export default function EquipoStage({ id, activePart, onPart, yaw, resetKey, reduced, onFail }: StageProps) {
  const m = useMaterials();
  const Model = MODELS[id];
  const model = useRef<THREE.Group>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const parts = equipos.find((e) => e.id === id)!.parts;
  return (
    <>
      <Canvas
        frameloop="demand"
        dpr={[1, 1.75]}
        camera={{ position: [4, 2.8, 5.3], fov: 30, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ touchAction: "pan-y" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onFail();
          });
        }}
      >
        <ambientLight intensity={0.45} />
        {/* El sol de la tarde, cálido, y un rebote frío del cielo. */}
        <directionalLight position={[4, 6, 3]} intensity={2.4} color="#fff1d8" />
        <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#cfe6fa" />
        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[10, 4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.5}
            position={[5, 1.5, 2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[6, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1}
            position={[-5, 1, -1]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[6, 2, 1]}
            color="#6fb6e8"
          />
        </Environment>

        <Turntable yaw={yaw} id={id} reduced={reduced}>
          <group ref={model} position={[0, 0, -0.1]}>
            <Terrace m={m} />
            <Model m={m} />
          </group>
          <ContactShadows
            key={id}
            position={[0, 0.002, 0.15]}
            opacity={0.55}
            scale={3.6}
            blur={2.4}
            far={2}
            resolution={512}
            frames={1}
          />
        </Turntable>

        <Controls resetKey={resetKey} />
        <Projector id={id} model={model} dots={dots} yaw={yaw} />
      </Canvas>
      {/* Puntos numerados: arrancan ocultos y el Projector los ubica en el primer cuadro. */}
      {parts.map((p, i) => (
        <button
          key={`${id}-${i}`}
          ref={(el) => {
            dots.current[i] = el;
          }}
          type="button"
          hidden
          className="pa-hotspot pa-num absolute top-0 left-0"
          data-active={activePart === i}
          aria-label={`${i + 1}. ${p.title}`}
          aria-pressed={activePart === i}
          onClick={() => onPart(i)}
        >
          {i + 1}
        </button>
      ))}
    </>
  );
}

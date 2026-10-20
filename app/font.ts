import { Archivo } from "next/font/google";

// Archivo con eje de ancho: expandida en titulares, normal para leer.
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });

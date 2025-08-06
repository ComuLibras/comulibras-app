import type { IconProps } from "@/application/shared/components/ui/icon";

export enum Colors {
  Vermelho = "#ef4444",
  Laranja = "#f97316",
  Ambar = "#f59e0b",
  Amarelo = "#eab308",
  VerdeClaro = "#84cc16",
  Verde = "#22c55e",
  Esmeralda = "#10b981",
  VerdeAzulado = "#14b8a6",
  Ciano = "#06b6d4",
  AzulClaro = "#0ea5e9",
  Azul = "#3b82f6",
  Indigo = "#6366f1",
  Violeta = "#8b5cf6",
  Roxo = "#a855f7",
  Fuchsia = "#d946ef",
  RosaPink = "#ec4899",
  Rosa = "#f43f5e",
}

type Icon = IconProps['name'];
type Color = {
  name: string;
  hex: Colors;
  icon: Icon;
}

export const colorsMap: Record<Colors, Color> = {
  [Colors.Vermelho]: {
    name: 'Vermelho',
    hex: Colors.Vermelho,
    icon: "house",
  },
  [Colors.Laranja]: {
    name: 'Laranja',
    hex: Colors.Laranja,
    icon: "house",
  },
  [Colors.Ambar]: {
    name: 'Âmbar',
    hex: Colors.Ambar,
    icon: "house",
  },
  [Colors.Amarelo]: {
    name: 'Amarelo',
    hex: Colors.Amarelo,
    icon: "house",
  },
  [Colors.VerdeClaro]: {
    name: 'Verde-claro',
    hex: Colors.VerdeClaro,
    icon: "house",
  },
  [Colors.Verde]: {
    name: 'Verde',
    hex: Colors.Verde,
    icon: "house",
  },
  [Colors.Esmeralda]: {
    name: 'Esmeralda',
    hex: Colors.Esmeralda, 
    icon: "house",
  },
  [Colors.VerdeAzulado]: {
    name: 'Verde-azulado',
    hex: Colors.VerdeAzulado,
    icon: "house", 
  },
  [Colors.Ciano]: {
    name: 'Ciano',
    hex: Colors.Ciano,
    icon: "house",
  },  
  [Colors.AzulClaro]: {
    name: 'Azul-claro',
    hex: Colors.AzulClaro,
    icon: "house",
  },
  [Colors.Azul]: {  
  name: 'Azul',
    hex: Colors.Azul,
    icon: "house",
  },
  [Colors.Indigo]: {
    name: 'Indigo',
        hex: Colors.Indigo,
    icon: "house",
  },  
  [Colors.Violeta]: {
    name: 'Violeta',
    hex: Colors.Violeta,
    icon: "house",
  },
  [Colors.Roxo]: {
    name: 'Roxo',
    hex: Colors.Roxo,
    icon: "house",
  },
  [Colors.Fuchsia]: {
    name: 'Fuchsia',
    hex: Colors.Fuchsia,
    icon: "house",
  },
  [Colors.RosaPink]: {
    name: 'Rosa-pink',
    hex: Colors.RosaPink, 
    icon: "house",
  },
  [Colors.Rosa]: {
    name: 'Rosa',
    hex: Colors.Rosa,
    icon: "house",
  },
}
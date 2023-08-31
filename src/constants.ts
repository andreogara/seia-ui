export type BatteryConfigMap = {
    name: string;
    dimension: {
        length: number;
        width: number;
    }
    energy: number;
    cost: number;
    release?: number;
}

export type ConfigState = {
    [key: string]: number;
}

export const EquipmentColorCoding:{[key:string]: string} = {
    transformer: "red",
    megapackxl: "blue",
    megapack2: "cyan",
    megapack: "orange",
    powerpack: "yellow"
}

export const batteryConfigurationMap = [
    {
        name: "megapackxl",
        dimension: {
            length: 40,
            width: 10
        },
        energy: 4,
        cost: 120000,
        release: 2022
    },
    {
        name: "megapack2",
        dimension: {
            length: 30,
            width: 10
        },
        energy: 3,
        cost: 80000,
        release: 2021
    },
    {
        name: " megapack",
        dimension: {
            length: 30,
            width: 10
        },
        energy: 2,
        cost: 50000,
        release: 2005
    },
    {
        name: "powerpack",
        dimension: {
            length: 10,
            width: 10
        },
        energy: 1,
        cost: 10000,
        release: 2000
    }
]

export const TransformerConfig = {
    name: "transformer",
    dimension: {
        length: 10,
        width: 10
    },
    energy: -0.5,
    cost: 10000
}

export const metrics = {
    distance: "FT",
    energy: "MWh"
}
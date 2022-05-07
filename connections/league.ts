import centra from "centra";

export async function getCurrentChampion() {
    try {
        const res = await centra("https://127.0.0.1:2999/liveclientdata/playerlist", "GET").send();

        const data = await res.json();
        for(const summoner of data) {
            if(summoner.summonerName == "Orang Fire") {
                return summoner.championName;
            }
        }
    } catch(e) {
        throw e;
    }
}

export async function getItems(): Promise<SummonerItem[]> {
    try {
        const res = await centra("https://127.0.0.1:2999/liveclientdata/playeritems?summonerName=Orang Fire", "GET").send();

        const data = await res.json() as SummonerItem[];
        return data;
    } catch(e) {
        throw e;
    }
}

export type SummonerItem = {
    canUse: boolean,
    consumable: boolean,
    count: number,
    displayName: string,
    itemId: number,
    price: number,
    rawDescription: string,
    rawDisplayName: string,
    slot: number;
}
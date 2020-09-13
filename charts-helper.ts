export { }

enum SortOrder {
    ASCENDING = "ASCENDING",
    DESCENDING = "DESCENDING"
}

type Platform = 'XBOX' | 'PC' | 'PLAYSTATION';

type Genre = 'RPG' | 'MOBA' | 'Shooter';

type RecordItem = {
    gameTitle: string;
    gamePlatform: Platform;
    genreName: Genre;
}

type Game = {
    id: number;
    title: string;
    platform: Platform;
}

const gameList: Game[] = [
    {
        "id": 1,
        "title": "The Witcher 3",
        "platform": "XBOX"
    },
    {
        "id": 2,
        "title": "The Witcher 3",
        "platform": "PLAYSTATION"
    },
    {
        "id": 3,
        "title": "Overwatch",
        "platform": "PC"
    }
];

const recordItemList: RecordItem[] = [
    {
        "gameTitle": "The Witcher 3",
        "gamePlatform": "PLAYSTATION",
        "genreName": "RPG"
    },
    {
        "gameTitle": "The Witcher 3",
        "gamePlatform": "XBOX",
        "genreName": "RPG"
    },
    {
        "gameTitle": "Overwatch",
        "gamePlatform": "PC",
        "genreName": "Shooter"
    },
    {
        "gameTitle": "Overwatch",
        "gamePlatform": "PC",
        "genreName": "Shooter"
    },
    {
        "gameTitle": "The Witcher 3",
        "gamePlatform": "PLAYSTATION",
        "genreName": "RPG"
    }
];

//construindo lista para grafico de barras ------------------------------------------------
const buildBarSeries = (games: Game[], records: RecordItem[]) => {
    //convertendo lista em map de games
    const mappedGames = gameList.map(
        game => {
            //filtrando o titulo e platforma de cada jogo para calcular qnt de ocorrencias
            const filteredGames = getFilteredByGame(records, game)
            return {
                x: `${game.title} | ${game.platform}`,
                y: filteredGames.length
            }
        });

    const sortedGames = getSortedGames(mappedGames, SortOrder.DESCENDING);
    //Por regra, esse método retorna os 8 primeiros
    return sortedGames.slice(0, 8);
}

function getFilteredByGame(records: RecordItem[], game: Game) {
    return records.filter(record => {
        return record.gameTitle === game.title &&
            record.gamePlatform === game.platform;
    });
}

function getSortedGames(mappedGames: { x: string; y: number }[], order: SortOrder) {
    return order == SortOrder.ASCENDING ?
        mappedGames.sort((a, b) => a.y - b.y) :
        mappedGames.sort((a, b) => b.y - a.y);
}

//construindo lista para grafico de rosca ----------------------------------------------------
const getPlatformChartData = (records: RecordItem[]) => {
    const platforms = ['XBOX', 'PC', 'PLAYSTATION'];

    const series = platforms.map(platform => {
        const filteredGames = getFilteredByPlatform(records, platform)
        return filteredGames.length;
    });

    return {
        labels: platforms,
        series: series
    };
}

function getFilteredByPlatform(records: RecordItem[], platform: string) {
    return records.filter(record => {
        return record.gamePlatform === platform;
    });
}

//construindo lista para grafico de rosca genero do jogo ----------------------------------------------------
const getGenreGameChartData = (records: RecordItem[]) => {
    const genres = ['RPG', 'MOBA', 'Shooter'];

    const genreByAmount = records.reduce(computeRecordItem, {});

    const labels = Object.keys(genreByAmount);
    const series = labels.map(x => genreByAmount[x])

    return {
        label: labels,
        series: series
    }
}

function computeRecordItem(obj: Object, record: RecordItem) {
    if(obj[record.genreName] !== undefined) {
        obj[record.genreName] += 1;
    } else {
        obj[record.genreName] = 1;
    }
    return obj;
}
const linksLoaded = (allLinks) => {
    return {
        type: 'LINKS_LOADED',
        payload: allLinks
    }
}

// const quizesLoaded = (allQuizes) => {
//     return {
//         type: 'QUIZES_LOADED',
//         payload: allQuizes
//     }
// }

export {
    linksLoaded
}
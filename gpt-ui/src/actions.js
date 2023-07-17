export const queryPrompt = (prompt, indexName) => {
    const params = new URLSearchParams({
        search: prompt,
        index_name: indexName
    }).toString();
    return fetch('https://quizbot.flipick.com/query?' + params)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error, status = ${res.status}`);
            }
            return res.json();
        })
        .catch(error => {
            console.log('Fetch Error: ', error);
        });
};

export const getKnowledgeBase = () => {
    return fetch('https://quizbot.flipick.com/knowledge-base').then(res => res.json())
}

export const uploadFileToServer = (file) => {
    const formData = new FormData()
    formData.append('file', file)

    return fetch('https://quizbot.flipick.com/file/upload', {
        method: 'POST',
        body: formData
    }).catch(error => console.log(error))
}
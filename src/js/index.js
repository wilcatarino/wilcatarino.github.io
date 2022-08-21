const processArticlesEnabled = false;
const articlesSource = "./data/articles.json";
const articleTagFormat = "<span class='fa-solid fa-tag'></span><a href='#{{articleTagHref}}'>#{{articleTagName}}</a>";
const fetchJsonOptions = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
};
const fetchMarkdownOptions = {
    method: "GET",
    headers: {
        "Content-Type": "text/markdown"
    }
};

if (processArticlesEnabled) {
    fetch(articlesSource, fetchJsonOptions)
        .then(response => { return response.json(); })
        .then(json => proccessArticles(json));
}

function enableAsideContent() {
    let asideContent = document.getElementById("aside-content");
    asideContent.removeAttribute("style");
};

function proccessArticles(articles) {
    articles.forEach(article => {
        fetch(article.content_source, fetchMarkdownOptions)
            .then(response => { return response.text(); })
            .then(markdown => processArticleContent(markdown));

        fetch(article.tags_source, fetchJsonOptions)
            .then(response => { return response.json(); })
            .then(json => processArticleTags(json));
    });
};

function processArticleContent(content) {
    let articleContent = document.getElementById("article-content");
    articleContent.innerHTML = marked.parse(content);
};

function processArticleTags(tags) {
    enableAsideContent();
    let asideTags = document.getElementById("aside-tags");
    tags.forEach(tag => {
        let newTag = document.createElement("li");
        newTag.innerHTML = articleTagFormat.replace("{{articleTagHref}}", tag).replace("{{articleTagName}}", tag);
        asideTags.appendChild(newTag);
    });
};

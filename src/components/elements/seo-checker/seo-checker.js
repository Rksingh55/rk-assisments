import React from 'react'

export default function SeoChecker({ text, title, htmlBlog }) {
    var score = 0;
    score = score + (title.split(" ").length / 4);
    score = score + ((htmlBlog.split(" ").length / 20));
    htmlBlog.split(" ").forEach(word => {
        if (
            title.toLocaleLowerCase().includes(word.toLocaleLowerCase()) ||
            word.includes("<img") ||
            word.includes("alt=") ||
            word.includes("https://") ||
            word.includes("<h1>") ||
            word.includes("<h2>") ||
            word.includes("<h3>") ||
            word.includes("<h4>") ||
            word.includes("<h5>") ||
            word.includes("<h6>")
        ) {
            score++;
        }
    });

    return <div>
        <h3>{text} : {parseInt(score)}</h3>
    </div>
}
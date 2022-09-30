export default function getRefs() {
    return {
        inputEl: document.querySelector(`input`),
        searchForm: document.querySelector(`#search-form`),
        submitBtn: document.querySelector(`button`),
        moreBtn: document.querySelector(`.load-more`),
        imageGallery: document.querySelector(`.gallery`)
    }
}
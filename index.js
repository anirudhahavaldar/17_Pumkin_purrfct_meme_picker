import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName('radio')
  for (let radio of radios) {
    radio.classList.remove('highlight')
  }
  document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {
  memeModal.style.display = 'none'
}

function renderCat() {
  const catObject = getSingleCatObject()

  memeModalInner.innerHTML = `
  <img 
    class="cat-img"
    src="images/${catObject.image}"
    alt="${catObject.alt}" >
  `
  memeModal.style.display = 'flex'
}

function getSingleCatObject() {
  const catArray = getMatchingCatArray()

  if (catArray.length === 1) return catArray[0]
  else return catArray[Math.floor(Math.random() * catArray.length)]
}

function getMatchingCatArray() {
  if (document.querySelector('input[type=radio]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type=radio]:checked'
    ).value
    const isGif = gifsOnlyOption.checked

    const matchingArray = catsData.filter(function (cat) {
      if (isGif) return cat.emotionTags.includes(selectedEmotion) && cat.isGif
      else return cat.emotionTags.includes(selectedEmotion) && !cat.isGif
    })

    return matchingArray
  }
}

function renderEmotionRadios(cats) {
  const emotionArray = getEmotionArray(cats)
  let radioItem = ''
  for (let emotion of emotionArray) {
    radioItem += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
          <input 
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions" >
      </div>
    `
  }
  emotionRadios.innerHTML = radioItem
}

function getEmotionArray(cats) {
  let array = []
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!array.includes(emotion)) {
        array.push(emotion)
      }
    }
  }
  return array
}

renderEmotionRadios(catsData)

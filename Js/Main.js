const playList = document.querySelector('.video-list-container')
let activeVideo = document.querySelector('.main-video-container video'),
  vid_Title = document.querySelector('.main-vid-title'),
  optViews = document.querySelector('.views'),
  optLike = document.querySelector('.num-like'),
  optDislike = document.querySelector('.num-dislike'),
  ddislike = document.querySelector('.like'),
  ddlike = document.querySelector('.dislike'),
  optDate = document.querySelector('.date')

function fetchApi(url) {
  fetch(url).then(res => res.json()).then(data => setData(data))
}
fetchApi('../Videos.json')

function setData(data) {
  for (let i = 0; i < data.length; i++) {
    let list = document.createElement('div')
    if (i == 0) {
      list.className = 'list active'
    } else {
      list.className = 'list'
    }
    list.innerHTML = `<video data-views="${data[i].views}" data-title="${data[i].vid_title}" data-relDate="${data[i].rel_date}" data-dislike="${data[i].dislike}" data-like="${data[i].like}" src="${data[i].vid_url}" class="list-video"></video><h3 class="list-title">${data[i].vid_title}</h3>`
    playList.append(list)
  }
  let playListChildren = document.querySelectorAll('.video-list-container .list')
  addAndRemoveActive(playListChildren)
}

function addAndRemoveActive(parent) {
  parent.forEach(el => {
    if (el.classList.contains('active')) {
      activeVideo.src = el.querySelector('video').src
      vid_Title.innerHTML = el.querySelector('video').dataset.title
      optViews.innerHTML = el.querySelector('video').dataset.views
      optLike.innerHTML = el.querySelector('video').dataset.like
      optDislike.innerHTML = el.querySelector('video').dataset.dislike
      optDate.innerHTML = el.querySelector('video').dataset.reldate
    }
    el.addEventListener('click', () => {
      parent.forEach(ele => {
        ele.classList.remove('active')
      })
      el.classList.add('active')
      addVideo(parent)
    })
  })
}
function addVideo(parent) {
  parent.forEach(el => {
    if (el.classList.contains('active')) {
      let vidViews = el.querySelector('video').dataset.views
      let relDate = el.querySelector('video').dataset.reldate
      let dislike = el.querySelector('video').dataset.dislike
      let like = el.querySelector('video').dataset.like
      let vidTitle = el.querySelector('video').dataset.title
      let vidSrc = el.querySelector('video').src
      activeVideo.src = vidSrc
      vid_Title.innerHTML = vidTitle
      optViews.innerHTML = vidViews
      optLike.innerHTML = like
      optDislike.innerHTML = dislike
      optDate.innerHTML = relDate
    }
  })
}

ddislike.addEventListener('click', () => {
  if (ddlike.classList.contains('liked')) {
    ddlike.classList.toggle('liked')
    ddlike.querySelector('.num-dislike').innerHTML++
    ddislike.classList.toggle('liked')
    if (ddislike.classList.contains('liked')) {
      ddislike.querySelector('.num-like').innerHTML++
    } else {
      ddislike.querySelector('.num-like').innerHTML--
    }
  } else {
    ddislike.classList.toggle('liked')
    if (ddislike.classList.contains('liked')) {
      ddislike.querySelector('.num-like').innerHTML++
    } else {
      ddislike.querySelector('.num-like').innerHTML--
    }
  }
})

ddlike.addEventListener('click', () => {
  if (ddislike.classList.contains('liked')) {
    ddislike.classList.toggle('liked')
    ddislike.querySelector('.num-like').innerHTML--

    ddlike.classList.toggle('liked')
    if (ddlike.classList.contains('liked')) {
      ddlike.querySelector('.num-dislike').innerHTML--
    } else {
      ddlike.querySelector('.num-dislike').innerHTML++
    }
  } else {
    ddlike.classList.toggle('liked')
    if (ddlike.classList.contains('liked')) {
      ddlike.querySelector('.num-dislike').innerHTML--
    } else {
      ddlike.querySelector('.num-dislike').innerHTML++
    }
  }
})
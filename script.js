//this is my function that animates the text
//it passes in the entry that just passed the threshold
const animateTextIn = (entry) => {
  //gets every child of the entry
  let childrenOfEntry = Array.from(entry.target.children)
  let transitionTime = 0.0

  //loops through each child
  childrenOfEntry.forEach(child => {
    //if the child has the class of fadeIn then it animates it
    if (child.classList.contains("fadeIn")) {
      if (child.dataset.loaded == "true") {
        return
      } else {
        //THIS IS HOW I MAKE IT DO A STAGGERED FADE IN AND SLIDE UP ON FIRST LOAD
        child.style.transitionDelay = transitionTime + "s"
        child.classList.add("active")
        transitionTime = transitionTime + .3

        //this is how I calculate how long each item should wait
        let waitingTime = (childrenOfEntry.length) * (1000)
        //running a timeout where it resets the styles and applies the data attribute of loaded to prevent it loading future times
        setTimeout(() => {
          childrenOfEntry.forEach(child => {
            child.dataset.loaded = "true"
            child.removeAttribute("style")
          })
        }, waitingTime)
      }
    }
  })
}

//function to just switch the mode depending on where we're at on the page
const toggleDarkMode = (entry) => {
  if (entry.target.dataset.mode == "dark") {
    document.body.dataset.theme = "dark"
  } else {
    document.body.dataset.theme = "light"
  }
}

//INTERSECTION OBSERVER
///////////////////////////////////////////////

//this is creating my observer
const createObserver = () => {
  let observer

  let options = {
    root: null,
    rootMargin: '0px',
    //how much has to be in view
    threshold: .5
  }

  //what I want to be looking out for
  let sectionTags = document.querySelectorAll('section')

  observer = new IntersectionObserver(handleIntersect, options)

  //adding the observer to each sectionTag
  sectionTags.forEach(section => {
    observer.observe(section)
  })
}

//this runs each time the observed crosses the threshold
const handleIntersect = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateTextIn(entry)
      toggleDarkMode(entry)
    }
  })
}

window.addEventListener('load', (event) => {
  createObserver()
})


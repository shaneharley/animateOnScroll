//this is my function that animates the text
//it passes in the entry that just passed the threshold
const animateTextIn = (entry) => {
  //gets every child of the entry
  //this is weird, because the .children doesn't return an array, I have to turn it into one in order to use forEach with it
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
        //here i'm saying that if it hasn't appeared for the first time, I just want to transition the opacity and transform NOT the color
        child.style.transitionDelay = transitionTime + "s"
        child.classList.add("active")
        transitionTime = transitionTime + .3

        //THIS IS HOW I WIPE THOSE STYLES FOR FUTURE LOADS
        let waitingTime = (childrenOfEntry.length - 1) * (10 * 100)
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

const toggleDarkMode = (entry) => {
  if (entry.target.dataset.mode == "dark") {
    document.body.dataset.theme = "dark"
  } else {
    document.body.dataset.theme = "light"
  }
}

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

//here I'm saying once it's run, create the observer
window.addEventListener('load', (event) => {
  createObserver()
})


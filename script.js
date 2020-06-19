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
      if (child.classList.contains("active")) {
        //THIS IS HOW I PREVENT IT FROM RUNNING AGAIN IF IT'S ALREADY DONE IT
        return
      } else {
        //THIS IS HOW I MAKE IT DO A STAGGERED FADE IN AND SLIDE UP ON FIRST LOAD
        //here i'm saying that if it hasn't appeared for the first time, I just want to transition the opacity and transform NOT the color
        child.style.transitionProperty = "opacity, transform"
        child.style.transitionDelay = transitionTime + "s"
        child.classList.add("active")
        transitionTime = transitionTime + .3

        //THIS IS HOW I WIPE THOSE STYLES FOR FUTURE LOADS
        let waitingTime = (childrenOfEntry.length - 1) * (10 * 100)
        //running a timeout where it resets the transition styles I applied
        setTimeout(() => {
          childrenOfEntry.forEach(child => {
            child.style = ""
          })
        }, waitingTime)

      }
    }

  })
}




const toggleDarkMode = (entry) => {
  if (entry.target.dataset.mode == "dark") {
    console.log("dark mode!")
    document.body.classList.remove("lightMode")
    document.body.classList.add("darkMode")
  } else {
    console.log("light mode")
    document.body.classList.add("lightMode")
    document.body.classList.remove("darkMode")
  }
}

//here I'm saying once it's run, create the observer
window.addEventListener('load', (event) => {
  createObserver()
})

//this is creating my observer
const createObserver = () => {
  let observer

  let options = {
    root: null,
    rootMargin: '0px',
    //how much has to be in view
    threshold: .7
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




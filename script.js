//this is my function that animates the text
//it passes in the entry that just passed the threshold
const animateTextIn = (entry) => {
  //gets every child of the entry
  //this is weird, because the .children doesn't return an array, I have to turn it into one in order to use forEach with it
  let childrenofEntry = Array.from(entry.target.children)
  let transitionTime = 0.5

  //loops through each child
  childrenofEntry.forEach(child => {
    //if the child has the class of fadeIn then it animates it
    if (child.classList.contains("fadeIn")) {
      child.classList.add("active")
      child.style.transitionDelay = transitionTime + "s"
      transitionTime = transitionTime + .3
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




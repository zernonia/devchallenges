// get JSON data
getData = async (recipe) => {
  const data = await fetch(`./${recipe}.json`).then( res => res.json())
  return data
}

// convert ** and __ to markUp HTML
markupString = (string) => {
  
  let countBold = 0
  let countItalic = 0

  const markBold = string.replace( /\*\*/g , () => {
    countBold++
    return countBold % 2 == 1 ? '<b>' : '</b>'
  })
  const markBoldItalic = markBold.replace( /\_\_/g , () => {
    countBold++
    return countBold % 2 == 1 ? '<i>' : '</i>'
  })
  return markBoldItalic
}

// populate fetched JSON data
populateHTML = (json) => {
  let ingreList = json.recipeIngredients
  let insList = json.recipeInstructions
  let sideList = json.sideInfo
  article = document.querySelector('.ingredient')
  instruction = document.querySelector('.instruction')
  aside = document.querySelector('aside')

  // populate Ingredient
  for( let ingre of ingreList ) {
    let ingreDiv = document.createElement("div")
    ingreDiv.classList.add('ingredient')
    ingreDiv.innerHTML = `<h4>${ ingre.ingredient }</h4>`
    for( let item of ingre.list) {
      let markUpItem = markupString(item)
      let ingreP = document.createElement("div")
      ingreP.classList.add('flex')
      ingreP.classList.add('ingre-div')
      ingreP.innerHTML = `
          <input type="checkbox">
          <p>${ markUpItem }</p>
        `
      ingreDiv.appendChild(ingreP)
      }
    article.appendChild(ingreDiv)
  }

  // populate Instructions
  for( let ins of insList ) {
    let insDiv = document.createElement("div")
    insDiv.classList.add('flex')
    insDiv.classList.add('step-div')
    let markUpItem = markupString(ins.action)
    insDiv.innerHTML = `
      <div class="step">
        <h3>${ ins.step }</h3>
      </div>
      <p class="info">${ markUpItem }</p>
      `
    instruction.appendChild(insDiv)
  }

  // populate Side Panel
  for ( let info of sideList) {
    let sideDiv = document.createElement("div")
    let key = Object.keys( info )[0]
    let camelCaseConvertToString = key.replace(/([A-Z])/g,' $1')
    let timeUnit

    // convert minutes to hours
    if (info[key] <= 60) {
      timeUnit = 'minutes'
    } else {
      info[key] = info[key] / 60 
      timeUnit = 'hours'
    }

    // Yield has different class, an svg
    sideDiv.classList.add('side')
    if ( key == 'yield' ){
      sideDiv.classList.add('servings')
      sideDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="currentColor" stroke="currentColor" viewBox="0 0 512 512"><path d="M498.682 435.326L297.917 234.56 63.357 0H45.026l-3.743 9.511c-9.879 25.104-14.1 50.78-12.205 74.249 2.16 26.752 12.323 49.913 29.392 66.982l183.11 183.11 24.152-24.152 169.285 189.293c16.84 16.84 45.825 17.84 63.665 0 17.554-17.554 17.554-46.114 0-63.667zM156.728 291.442L13.317 434.853c-17.552 17.552-17.552 46.113 0 63.665 16.674 16.674 45.519 18.146 63.665 0l143.412-143.412-63.666-63.664zM490.253 85.249l-81.351 81.35-21.223-21.222 81.351-81.351-21.222-21.222-81.35 81.35-21.222-21.222 81.351-81.35L405.366.361l-106.11 106.11a74.903 74.903 0 00-21.828 48.535c-.277 4.641-1.329 9.206-3.074 13.548l68.929 68.929c4.342-1.747 8.908-2.798 13.548-3.075a74.887 74.887 0 0048.535-21.827l106.11-106.109-21.223-21.223z"/></svg>
        <div class="side-text">
          <h5>${ key }</h5>
          <p>${ info.yield } servings</p>
        </div>
      `
    } else {
      sideDiv.innerHTML = `
        <svg width="28" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div class="side-text">
          <h5>${ camelCaseConvertToString }</h5>
          <p>${ info[key] } ${ timeUnit } </p>
        </div>
      `
    }

    aside.appendChild(sideDiv)
  }
}
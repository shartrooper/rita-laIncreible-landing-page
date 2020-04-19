const imgArr = [{ item: 0, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FcollageB.jpg?v=1577029622063" },
{ item: 1, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FcollageA.jpg?v=1577029623988" },
{ item: 2, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FcollageC.jpg?v=1577029626202" },
{ item: 3, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FCollageD.jpg?v=1577029630268" },
{ item: 4, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FCollageF.jpg?v=1577029637760" },
{ item: 5, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FCollageG.jpg?v=1577029638092" },
{ item: 6, link: "https://cdn.glitch.com/4a7ba499-df3d-4e00-9ea2-bd3b6f91f373%2FCollageE.jpg?v=1577029647761" }];
let num = 0;

const SliderShow = () => {
  let newArr = [];

  const getaRanNumber = (num) => Math.round(Math.random() * num);

  const populateElems = (selectedPics, frames) => {

    for (let index = 0; index < frames.length; index++) {
      let of_picture = document.createElement("img");
      of_picture.src = imgArr[selectedPics[index]].link;
      of_picture.id = "num_" + imgArr[selectedPics[index]].item;
      of_picture.alt = "Oficinas RITACA";
      of_picture.className = "of_picture"
      frames[index].appendChild(of_picture);
    }

  }

  const genArrayofPopulatingPics = (len) => {
    let genArr = [];
    let ranNum = getaRanNumber(6);
    genArr.push(ranNum);
    do {
      ranNum = getaRanNumber(6);
      genArr = genArr.filter(num => num !== ranNum);
      genArr.push(ranNum);
    }
    while (genArr.length < len)
    return genArr;
  }

  const alternateImgs = async () => {
    let aux = 0, found = 0, auxArr = [];
    while (found !== undefined) {
      aux = getaRanNumber(6);
      found = newArr.find(ele => ele === aux);
    }
    let selectedElem = document.getElementById("num_" + newArr[getaRanNumber(3)]);
    selectedElem.id = "num_" + imgArr[aux].item;
    selectedElem.classList.add('fadeIn');

    let resolvewithImage = () => {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(selectedElem.src = imgArr[aux].link);
        }, 800));
    }

    let removeAnimClass = () => {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(selectedElem.classList.remove('fadeIn'));
        }, 100));
    }

    let anImage = await resolvewithImage();
    let another=  await removeAnimClass();

    let pictures = document.getElementsByClassName("of_picture");
    for (const picture of pictures) {
      let picItem = picture.id.slice(4);
      auxArr.push(parseInt(picItem));
    }
    newArr = auxArr;
    setTimeout(alternateImgs, 4000);
  }

  const switchPictures = () => {
    let frames = document.getElementsByClassName("sub-rect");
    newArr = genArrayofPopulatingPics(frames.length);
    populateElems(newArr, frames);
    alternateImgs();
  }

  const showsText = (n) => {
    let x = document.getElementsByClassName("paragraph");
    for (let i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[n].style.display = "block";
  }

  const counterDivs = (n) => !n ? showsText(0) : showsText(1);

  return {
    a: showsText,
    b: counterDivs,
    c: switchPictures
  }
}

SliderShow().a(num);
SliderShow().c();

const arrowSlider = () => {
  num = !num ? 1 : 0; SliderShow().b(num);
}
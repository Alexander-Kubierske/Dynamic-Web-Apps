this project required me to create factory functions for the book preview capability of the website. It also called for me to create other factory functions in the code however after reviewing the way the code has been written there are very few functions that would be improved by creating a factory function. I have outlined them below:

function 1:

export const pageLoader = (EXTRACTED) => {
  for (const { author, image, title, id } of EXTRACTED) {
    const preview = createPreview({
      author,
      id,
      image,
      title,
    });

    FRAGMENT.appendChild(preview);
  }

  htmlSelector.list.items.appendChild(FRAGMENT);
};

This function is being passed an object known as EXTRACTED which is one of the requirements for making a factory function however it directly appends the product to the DOM. We could thus wrap this in another function that appends the return element of this function but it would only achieve a layer of privacy for the variables in the function. 

Thus if we did create the encapsulating function we would take away the main functionality of pageLoader function which is its ability to append to the DOM.
If we did want to achieve privacy for the variable information being passed to createPreview we could instead abstract this to its own module however it is already in a module separate from the one called by the html page upon generation.

Function 2:

const createAllOptions = (dataObject) => {
  const { innerText, objectRepresentation, data } = dataObject;
  const optionsElement = document.createDocumentFragment();
  let element = document.createElement("option");
  element.value = "any";
  element.innerText = innerText; // this adds an option called all genres
  optionsElement.appendChild(element);

  for (const [id, name] of Object.entries(data)) {
    // another for loop choice that populates the select element options
    element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    optionsElement.appendChild(element);
  }

  htmlSelector.search[objectRepresentation].appendChild(optionsElement); // adds all options to the select element for each genre
};

Just as with function 1 function 2 is passed and object but directly modifies the DOM. As such it doesn't need another function to unpack the object it receives and doesn't need that function to do it's intended purpose of appending the element.

I believe that the size of this website and its intention is perhaps too small for us to need a function to be used and created multiple times. 
For theory sake if this website was a general media referencer and you would look for music and movies or any other searchable items we could consider changing the functions in these ways:

function 1 

export const createPageGenerator = (createPreview, targetAttributes) => {

const {htmlPath, extracted} = targetAttributes

return const pageLoader => () {
    const fragment = document.createDocumentFragment();

      for (const { iterableItems } of extracted) {

          const preview = createPreview({...iterableItems});

          FRAGMENT.appendChild(preview);
      };

    htmlPath.appendChild(FRAGMENT);

  };
};

createPageGenerator(createPreview, setBooks)

This code would need to modify a few things to run we would need to now modify extracted to be setBooks and include the htmlPath which we want to change according to the event that called this page generation. extracted will also need to be inside setBooks and include the path which we called as well as the items each piece of media has such as id, author, genre etc.
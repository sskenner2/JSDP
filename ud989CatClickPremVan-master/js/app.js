
// ref https://github.com/KelseySteele/Cat-Clicker-Premium-Pro/blob/master/js/main.js
/* ======= Model ======= */

var model = {
    currentCat: null,
    //> hides the admin disply area
    adminShow: false,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'img/4154543904_6e2428c421_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {
    //> init function initializes with the begining data. keep out of the DOM.
    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
//? does this belong here?
        adminView.hide();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },
    //> calls the array of cats
    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    //> sets the new cat
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
    //> function runs when admin button is clicked
    adminDisplay: function() {
        if (model.adminShow === false) 
        {
           model.adminShow = true;
           //> displays the admin input boxes and buttons
           adminView.show(); 
        } else if (model.adminShow == true)
        {
            model.adminShow = false;
            //> hides the admin input boxes and buttons
            adminView.hide();
        }
    },
    
    //> hides admin display and saves new cat data when save button is clicked
    adminSave: function() {
        model.currentCat.name = adminCatName.value;
        model.currentCat.imgSrc = adminCatUrl.value;
        model.currentCat.clickCount = adminCatClicks.value;
        catView.render();
        catListView.render();
        adminView.hide();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    },
    
    var adminView = {
        init: function() {
            this.adminCatName = document.getElementById("adminCatName");
            this.adminCatUrl = document.getElementById("adminCatUrl");
            this.adminCatClicks = document.getElementById("adminCatClicks");
            
            var admin = document.getElementById("admin");
            
            this.adminBtn = document.getElementById("adminBtn");
            this.adminCancel = document.getElementById("adminCancel");
            this.adminSave = document.getElementById("adminSave");
            
            //> on click show admin display
            this.adminBtn.addEventListner('click', function() {
                octopus.adminDisplay();
            });
            
            //> on click hide admin display without saving new content
            this.adminCancel.addEventListner('click', function() {
                octopus.adminCancel();
            });
            
            //> on click hide admin display and saving new content
            this.adminSave.addEventListner('click', function() {
                octopus.adminSave();
            });
            
            this.render();
        },
        
        render: function() {
            //> calls current cat
            var currentCat = octupus.getCurrentCat();
            this.adminCatName.value = currentCat.name;
            this.adminCatUrl.value = currentCat.imgSrc;
            this.adminCatClicks.value = currentCat.clickCount;
        },
        
        //> show / hide the admin div on index.html
        show: function() {
            admin.style.display = 'block';
        },
        
        hide: function() {
            admin.style.display = 'none';
        }
    }
};

// make it go!
octopus.init();

// -----------------------------------------------------
// === model ===

// var model = {
//     currentCat: null,
//     cats: [
//         {
//             clickCount : 0,
//             name : 'tabby',
//             imgSrc : 'img/434164568_fea0ad4013_z.jpg',
//             imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
//         },
//         {
//             clickCount : 0,
//             name : 'tiger',
//             imgSrc : 'img/4154543904_6e2428c421_z.jpg',
//             imgAttribution : 'https://www.flickr.com/photos/xhamx/4154543904'
//         },
//         {
//             clickCount : 0,
//             name : 'scaredy',
//             imgSrc : 'img/22252709_010df3379e_z.jpg',
//             imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
//         },
//                 {
//             clickCount : 0,
//             name : 'shadow',
//             imgSrc : 'img/1413379559_412a540d29_z.jpg',
//             imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
//         },
//                 {
//             clickCount : 0,
//             name : 'sleepy',
//             imgSrc : 'img/9648464288_2516b35537_z.jpg',
//             imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
//         }
//     ]
// };

// // === octopus ===

// var octopus = {
    
//     init: function() {
//         // set our current cat to the first one in the list
//         model.currentCat = model.cats[0];
        
//         // tell our views to initialize
//         catListView.init();
//         catView.init();
//     },
     
//      getCurrentCat: function() {
//          return model.currentCat;
//      },
     
//      getCats: function() {
//          return model.cats;
//      },
     
//      // set the currently-selected cat to the object passed in
//      setCurrentCat: function(cat) {
//          model.currentCat = cat;
//      },
     
//      // increment the counter for the currently-selected cat
//      incrementCounter: function() {
//          model.currentCat.clickCount++;
//          catView.render();
//      }
// };

// // === view ===

// var catView = {
//     init: function() {
//         // store pointers to our DOM elements for easy access later
//         this.catElem = document.getElementById('cat');
//         this.catNameElem = document.getElementById('cat-name');
//         this.catImageElem = document.getElementById('cat-img');
//         this.countElem = document.getElementById('cat-count');
        
//         // on click, increment the current cat's counter
//         this.catImageElem.addEventListener('click', function() {
//             octopus.incrementCounter();
//         });
        
//         // render this view (update the DOM elements with the right values)
//         this.render();
//     },
    
//     render: function() {
//         // update the DOM elements with values from the current cat
//         var currentCat = octopus.getCurrentCat();
//         this.countElem.textContent = currentCat.clickCount;
//         this.catNameElem.textCountent = currentCat.name;
//         this.catImageElem.src = currentCat.imgSrc;
//     }
// };

// var carListView = {
//     init: function() {
//         // store the DOM element for easy access later
//         this.catListElem = document.getElementById('cat-list');
        
//         // render this view (update the DOM elements with the right values)
//         this.render();
//     },
    
//     render: function() {
//         var cat, elem, i;
        
//         // get the cats we'll be rendering from the octopus
//         var cats = octopus.getCats();
        
//         // empty the cat list
//         this.catListElem.innerHTML = '';
        
//         // Loop over the cats
//         for (i = 0; i < cats.length; i++) {
//             // this is the cat we're currently looping over
//             cat = cats[i];
            
//             // make a new cat list item and set its text
//             elem = document.createElement('li');
//             elem.textContent = cat.name;
            
//             // on click, setCurrentCat and render the catView (this uses our closure-in-a-loop trick to connect the value of the cat variable to the click event function)
//             elem.addEventListener('click', (function(catCopy) {
//                 return function() {
//                     octopus.setCurrentCat(catCopy);
//                     catView.render();
//                 };
//             })(cat));
            
//             // finally, add the element to the list
//             this.catListElem.appendChild(elem);
//         }
//     }
// };

// // make it go!
// octopus.init();
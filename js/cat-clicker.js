$(function() {
    var model = {

        currentCat: null,
        catNames: ['audrey', 'barbara', 'charlotte', 'diana'],
        data: [],

        init: function() {
            this.data = [
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
            ];
            this.currentCat = this.data[0];
        }
    };

    var controller = {

        init: function() {
            model.init();
            selectionView.init();
            catView.init();
        },

        getCurrentCat: function() {
            return model.currentCat;
        },

        getCats: function() {
            return model.data;
        },

        catSelected: function(cat) {
            model.currentCat = cat;
            catView.render();
        },

        catClicked: function() {
            model.currentCat.clickCount++;
            catView.render();
        }
    };

    var catView = {

        init: function() {
            this.$catImage = $('#cat-image');
            this.$catName = $('#cat-name');
            this.$clickCounter = $('#click-counter');

            this.attachEventListener();
            this.render();
        },

        render: function() {
            var cat = controller.getCurrentCat();
            this.$catImage.attr('src', cat.imgSrc);
            this.$catImage.attr('attribution', cat.imgAttribution);
            this.$catName.text(cat.name);
            this.$clickCounter.text(cat.clickCount);
        },

        attachEventListener: function() {
            this.$catImage.click(function() {
                controller.catClicked();
            });
        }
    };

    var selectionView = {

        init: function() {
            this.$catList = $('#cat-list');

            this.render();
        },

        render: function() {
            var cats = controller.getCats();

            this.$catList.empty();

            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var listElement = $('<li class="list-group-item"></li>');
                listElement.text(cat.name);
                listElement.click((function(cat){
                    return function() {
                        controller.catSelected(cat);
                    }
                })(cat));
                this.$catList.append(listElement);
            }
        }
    };

    controller.init();
});
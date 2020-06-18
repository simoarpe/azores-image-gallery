# Azores Image Gallery

This project is a small Frankestein that was put together from other similar projects:  
• [Jekyll Gallery Generator](https://github.com/ggreer/jekyll-gallery-generator)  
• [Jekyll MiniMagick new](https://github.com/MattKevan/Jekyll-MiniMagick-new)  
• [urban-theme](https://github.com/midzer/urban-theme)  

Check [this blog post](http://sarpex.co.uk/2019/02/quick-experiment-with-ruby-and-jekyll/) if you want to know more about the creation of Azores Image Gallery 😀

## Demo
If you want to see Azores Image Gallery in action check this [demo](http://sarpex.com/travels): it's a small set of galleries put together in 1 minute.

## Use case

The main goal is to show a given set of albums with ease leveraging the flexibility of Jekyll to provide a pleasant theme.
![Gallery Index](https://github.com/simoarpe/azores-image-gallery/blob/master/gallery_index.png)
![Gallery Page](https://github.com/simoarpe/azores-image-gallery/blob/master/gallery_page.gif)

The following configuration options are applied by default if not specified:
```config.yml
gallery:
  root: false               # When true, it generates the main gallery index at root level.
  dir: photos               # Path to the gallery
  symlink: true             # false: copy images into _site. true: create symbolic links (saves disk space)
  title: "Photos"           # Title for gallery index page
  title_prefix: "Photos: "  # Title prefix for gallery pages. Gallery title = title_prefix + gallery_name
  auto_orient: false        # False by defeault. When activated it rotates the images based on the exifr.
  sort_field: "date_time"   # How to sort galleries on the index page.
                            # Possible values are: title, date_time, best_image
  thumbnail_size:
    x: 300                  # max width of thumbnails (in pixels)
    y: 300                  # max height of thumbnails (in pixels)
```

Check `_config.yml` for the full list of options.

## Installation and Configuration

* Clone the project and simply place all your albums in the gallery folder that by default is `photos`.
* The first time only run `bundle install` to download all the dependencies.
* Start Jekyll by typing `jekyll serve`.
The firts time the build starts (either with `jekyll build` or `jekyll serve`) it will take some time to generate all the thumbnails.

DONE!
When Jekyll is ready navigate to `localhost:4000` to browse all your images, and mobile integration with swiping is supported too!

To further improve the experience you can modify, or remove some configuration options like
```config.yml
title: Your awesome title
email: your-email@example.com
description: >- # this means to ignore newlines until "baseurl:"
  Write an awesome description for your new site here. You can edit this
  line in _config.yml. It will appear in your document head meta (for
  Google search results) and in your feed.xml site description.
baseurl: "" # the subpath of your site, e.g. /blog
url: "" # the base hostname & protocol for your site, e.g. http://example.com
twitter_username: jekyllrb
github_username:  jekyll
```

To offer the site in your local network run `jekyll serve --host 0.0.0.0` and all the devices connected to the same network can navigate the albums by typing `<local_ip>:4000`. The `<local_ip>` is the local IP of the machine serving the Jekyll site. On OSx the IP can be easily discovered by accessing the Network Preferences.

## Other useful info

* Azores Image Gallery uses under the hood [`Minimagick`](https://github.com/minimagick/minimagick) to generate all the thumbnails. `Minimagick` is a clone of [`Rmagic`](https://github.com/rmagick/rmagick) but with a smaller memory footprint.

* The `symlink` option, that is enabled by default, will create symbolic links instead of copying every pictures in order to save disk space.

* `auto_orient` options is disabled by default. If set to true Azores Image Gallery will use an [Exif Reader](https://github.com/remvee/exifr) to determine the actual orientation of a picture.


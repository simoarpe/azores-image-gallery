# Azores Image Gallery

This project is a small Frankestein that was put together from other similar projects:  
• [Jekyll Gallery Generator](https://github.com/ggreer/jekyll-gallery-generator)

• [Jekyll MiniMagick new](https://github.com/MattKevan/Jekyll-MiniMagick-new)

• [urban-theme](https://github.com/midzer/urban-theme)

The main goal is to show a given set of albums with ease leveraging the flexibility of Jekyll to provide a pleasant theme.

The following configuration options are applied by default if not specified:
```config.yml
gallery:
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

Check `_config.yml` for the full list of options/

* Simply place all your albums in the albums folder that by default is photos.
* Start Jekyll by typing `jekyll serve`
The firts time the build starts (either with `jekyll build` or `jekyll serve`) it will take some time to generate all the thumbnails.

DONE!
Navigate to `localhost:4000` to browse all your images, mobile integration with swipe is supported too!

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

There are also some placeholders in the following places:
* `_includes/header.html`:  `<a class="site-title" href="{{ site.baseurl }}/"><img src="holder.js/500x150"></a>`
* `_layouts/default.html`:  `<script src="{{ '/js/holder.js' | prepend: site.baseurl }}"></script>`

These can be changed with something better to improve the generated site.

To offer the site in your local network run `jekyll serve --host 0.0.0.0` and all the devices connected to the same network can navigate the albums by typing `<local_ip>:4000`. The `<local_ip>` is the local IP of the machine serving the Jekyll site, and on OSx can be easily discovered by accessing the Network Preferences.




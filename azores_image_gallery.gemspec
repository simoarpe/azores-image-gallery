# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "azores_image_gallery"
  spec.version       = "1.1"
  spec.authors       = ["Simone Arpe"]
  spec.email         = ["simon.arpe@gmail.com"]

  spec.summary       = %q{A Jekyll site with the main goal to show a set of albums with ease and a pleasant theme out of the box.}
  spec.homepage      = "https://github.com/simoarpe/azores-image-gallery"
  spec.license       = "APACHE2"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(css|js|_(includes|layouts|sass|plugins)/|(LICENSE|README)((\.(txt|md|markdown|html)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.8.5"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
  spec.add_runtime_dependency "jekyll-minimagick", "~>0.0.4"  
  spec.add_runtime_dependency "exifr", "~>1.3.5"

  spec.add_development_dependency "bundler", ">= 2.2.10"
end

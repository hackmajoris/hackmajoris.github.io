---
layout: post
title: Getting up a personal blog using Jekyll. 
author: Alexandru Ilies
---

In this post, I will provide a step by step tutorial regarding the process I used for getting up my blog. 
In the past, I had a personal website, hosted on a paid hosting. I pied for the hosting services about 40$ / year + about 35$ / year for a personal domain.

Now, with GitHub pages, it is much easier and cheaper(actually it cost you 0$) to set up a personal site/blog. Yes, you will not have a custom domain name but it is not so important for me (and maybe for you) now. The only thing which matters is the content and the content delivery process. 
 
 
## Introduction 

### What is GitHub Pages?

GitHub Pages is a platform/feature provided by GitHub where users can host websites based on their GitHub repositories.
 
### What is Jekyll ?

Jekyll is a static sites generator tools, written in Ruby and it is the engine behind GitHub Pages platform.
 
## Installation and Configuration

### GitHub repository
In order to create a personal site/blog, first of all, you have to create a repository using this format: **your_github_username**.github.io
! It's enough to add in this repository a single **index.html** file, with some content, in order to see that the site up at https://**your_github_username**.github.io
That's all 🙃
 
### Jekyll install
The windows installation details can be found [here](https://jekyllrb.com/docs/windows/).
 
I use a macOS system and here is how the installation process can be done:

```bash
~ gem install jekyll bundler
~ $ jekyll new my-awesome-site
~ $ cd my-awesome-site
~/my-awesome-site $ bundle exec jekyll serve
# => Now browse to http://localhost:4000
```

Now you have a running Jekyll site, which has a predefined theme, which name is Minima (see how it looks -> [https://jekyll.github.io/minima/)](https://jekyll.github.io/minima/)

If you don't have in mind to build your own theme, you can select one from this list of official supported themes: [https://pages.github.com/themes/](https://pages.github.com/themes/), or, from this unofficial themes list: [https://github.com/topics/jekyll-theme](https://github.com/topics/jekyll-theme)

### General configuration
When you generate a new Jekyll project, you should find a **_config.yml** file in the project directory. It looks in this way:
 ```ruby
title: Your awesome title
author: GitHub User
email: your-email@domain.com
description: > # this means to ignore newlines until "baseurl:"
Write an awesome description for your new site here. You can edit this
line in _config.yml. It will appear in your document head meta (for
Google search results) and in your feed.xml site description.
twitter_username: jekyllrb
github_username:  jekyll
    
# Minima date format
# refer to http://shopify.github.io/liquid/filters/date/ if you want to customize this
minima:
 date_format: "%b %-d, %Y"
    
# If you want to link only specific pages in your header, uncomment
# this and add the path to the pages in order as they should show up
#header_pages:
# - about.html
   
# Build settings
markdown: kramdown
theme: minima
exclude:
 - Gemfile
 - Gemfile.lock 
```
 
The configuration options are quite clear.
Here, in this configuration file, you can specify a theme. If you choose one from an officially supported theme, only you have to do is to modify the theme name in the theme variable. For example, if we choose [Hacker](https://pages-themes.github.io/hacker/) theme:

```ruby
theme: jekyll-theme-hacker
```
    
You can see theme [documentation](https://github.com/pages-themes/hacker).
 
If you want to install an unofficial theme - follow the steps described [here](https://help.github.com/articles/adding-a-jekyll-theme-to-your-github-pages-site/).

 
 That's all.
 
### Disquss integration     
## Content delivery process
-----
### Using VSCode
Waiting...
### Using AI Writer 😻
Waiting..
### sadasdasd

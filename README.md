# Katherine Anne

An online project to provide access to the ideas, attitudes, and experiences of a distinguished 20th century American writer.

## Dependencies

To work on this project you will need some open source software you can acquire yourself:

* ansible
* vagrant
* vagrant vbguest additions plugin (`vagrant plugin install vagrant-vbguest
`)
* npm

As well as some open source software as-yet unreleased

* some "must use" Wordpress plugins for katherine-anne
* a package of query templates for Elasticsearch

And, of course, some data

* a copy of the project metadata (for building the Elasticsearch index)
* some image assets

## Quick Start

Once you have all the dependencies above:

* `git clone https://github.com/trevormunoz/katherine-anne.git`
* `cd katherine-anne`
* `npm install`
* `vagrant up`
* `gulp run`

At this point you should be able to visit the Wordpress site at: [http://192.168.33.10](http://192.168.33.10)

And to see the Elasticsearch install at: [http://192.168.33.11:9200](http://192.168.33.11:9200)

## License

Code is licensed under the MIT open source license. See the [LICENSE](LICENSE) file for the complete license.

__Please note__: logos, images, and other media referenced via url from the codebase are not covered by this license. Please do not republish assets without written permission from the University of Maryland Libraries.

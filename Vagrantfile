# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  config.vm.define "wordpress" do |wordpress|
    wordpress.vm.hostname = "wordpress"
    wordpress.vm.network "private_network", ip: "192.168.33.10"
    wordpress.vm.synced_folder "ansible/data/wordpress", "/vagrant/data", create: true
    wordpress.vm.synced_folder "dist", "/var/www/wordpress/wp-content/themes/katherine-anne",
      :mount_options => ["dmode=777","fmode=777"], create: true

    config.vm.provider "virtualbox" do |vb|
      vb.name = "kap-wordpress"
      vb.memory = "2048"
    end

    wordpress.vm.provision "ansible" do |ansible|
      ansible.playbook = "ansible/kap-wordpress.yml"
      ansible.inventory_path = "ansible/hosts"
      ansible.limit = "kap-wordpress"
      ansible.skip_tags = 'search'
      ansible.verbose = 'v'

      ansible.extra_vars = { ansible_ssh_user: 'vagrant'}
    end


  end

  config.vm.define "elasticsearch" do |es|
    es.vm.hostname = "elasticsearch"
    es.vm.network "private_network", ip: "192.168.33.11"
    es.vm.synced_folder "ansible/data/elasticsearch", "/vagrant/data",
      :mount_options => ["dmode=777","fmode=664"], create: true

    config.vm.provider "virtualbox" do |vb|
      vb.name = "kap-elasticsearch"
      vb.memory = "2048"
    end

    es.vm.provision "ansible", run: "always" do |ansible|
      ansible.playbook = "ansible/kap-elasticsearch.yml"
      ansible.inventory_path = "ansible/hosts"
      ansible.limit = "kap-elasticsearch"
      ansible.skip_tags = 'app'
      ansible.tags = 'search'
      ansible.verbose = 'v'

      ansible.extra_vars = { ansible_ssh_user: 'vagrant'}
    end
  end

end

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "bento/ubuntu-14.04"

  config.ssh.forward_agent = true

  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.provider "vmware_fusion" do |v|
    v.vmx["memsize"] = "8056"
    v.vmx["numvcpus"] = "2"
    v.vmx["tools.syncTime"] = "TRUE"
    v.vmx["tools.synchronize.restore"] = "TRUE"
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
  end
end

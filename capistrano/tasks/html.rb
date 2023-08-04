namespace :html do
  desc "Settings"
  task :settings do
  end

  desc "Install"
  task :install do
    on roles(:app) do
      execute :rm, '-rf', deploy_to + "/#{fetch(:webroot)}"
      execute :ln, '-s', "#{current_path}/#{fetch(:app_webroot, 'public')}", deploy_to + "/#{fetch(:webroot)}"
    end
  end
end
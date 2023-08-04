# Revert the database when a rollback occurs
Rake::Task["deploy:rollback_release_path"].enhance do
  # invoke "node:revert_database"
end

# Backup the database when publishing a new release
# Rake::Task["deploy:published"].enhance ["node:dbbackup"]

# After publication run updates
Rake::Task["deploy:published"].enhance do
  # Add post deployment tasks here.
end

namespace :node do
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

  # This will need to be modified for postgresSQL
  desc "Backup the database"
  task :dbbackup do
    on roles(:db) do
      within "#{release_path}/#{fetch(:app_webroot, 'public')}" do
        execute :mysqldump, "-h mysql", "#{fetch(:app_db_name, '')} >", "#{release_path}/db.sql"
        execute :gzip, "#{release_path}/db.sql"
      end
    end
  end

  # This will need to be modified for postgresSQL
  desc "Revert the database"
  task :revert_database do
    on roles(:db) do
      within "#{release_path}/#{fetch(:app_webroot, 'public')}" do
        execute :gunzip, "#{release_path}/db.sql.gz"
        execute :mysql, "-h mysql", "#{release_path}/db.sql"
      end
    end
  end
end
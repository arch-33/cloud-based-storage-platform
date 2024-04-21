# Cloud Storage Platform 
This project is a cloud storage platform built using Laravel, ReactJS, and Inertia.js. It provides robust features for managing your files and folders securely in the cloud. 
## Features 
- **Authentication:** register, log in, password reset, email verification ..., and manage your account. 
- **File and Folder Management:** 
	- Upload files and create folders to organize your data. 
	- Navigate between files/folders, delete, and restore seamlessly. 
- **File Sharing:** Share files and folders with others, granting them access levels. 
- **Downloading:** Download files directly to your device. 

## Technologies 
- **Backend:** Laravel (PHP framework) 
- **Frontend:** ReactJS + nextui + tailwindcss 
- **Frontend-Backend Interaction:** Inertia.js
## Getting Started 

### Installation 
1. **Clone the repository:**
```bash
git clone https://github.com/arch-33/cloud-based-storage-platform
```

2. **Navigate to the project directory:**
```bash
cd cloud-based-storage-platform
```

3. **Create a `.env` file:**
```bash
cp .env.example .env
```
Update the `.env` file with your database and other configuration details.

4. **Start the Sail containers:**
```bash
docker-compose up -d
# or
sail up
```
*(consider adding this to your alias: `alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'`)*

This will create and run the necessary Docker containers for the application.    

5. **Install dependencies:**    
```bash
sail composer install
sail npm install
```

6. **Generate an application key:**
```bash
sail artisan key:generate
```

7. **Set up the database:**
Run database migrations:
```bash
sail artisan migrate
```

Seed data into database : 
```bash
sail artisan db:seed
```

8. **Link storage directory**:
```bash
sail artisan storage:link
```

9. **Compile frontend assets :**    
```bash
sail npm run build
```
10. **Explore**

**Since Sail is already up, you can just visit [http://localhost](http://localhost/)**

## Screenshots
*(soon)*

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
@echo off
setlocal 

call :Available docker
if %errorlevel% neq 0 goto :EOF

call :Available docker-compose
if %errorlevel% neq 0 goto :EOF

goto :Run

:Available
where "%1" >nul 2>nul
if %errorlevel% neq 0 (
    echo %1 not found! See https://docs.docker.com/desktop/windows/install/
    exit /b 1
)

exit /b 0

:Run
cd docker
echo Building and starting environment...
start /w "Docker Window" docker-compose --profile=dev up --build
echo Done



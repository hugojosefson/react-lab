@echo off

cls
echo.
echo Welcome, honored lab participant.
echo ---------------------------------
echo.

call npm install

echo Dependencies installed successfully!

start .\node_modules\.bin\http-server
call .\node_modules\.bin\jsx src dist --watch --extension jsx




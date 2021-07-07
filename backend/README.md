# chefs-kiss

## Notes:

### To activate a virtual environment

```bash
pipenv shell
```

### To deactivate a virtual environment

```bash
deactivate
exit
```

### To install all the dependencies from pipenv

```bash
pipenv install
```

### To install a specific dependency into the project (make sure you are within the virtual environment)

```bash
pipenv install dependency_name
```

### To run the Flask Server (through pipenv's virtual environment)

```bash
./run.sh
```

### To run the Flask Server (through Docker)

```bash
make start-dev-container
```
# ECS 171 Final Project
**This repository is made public for submission on Saturday June 4th**

## Running the full project
System Requirements: `Node.js`, `Python 3.6+`
### Backend

There's a file called ```backend.py```  in the root folder.
Install dependencies:

```bash
pip3 install uvicorn pandas numpy fastapi pydantic
```
Then run this command in the root folder:
```bash
python3 backend.py
```
### Frontend
Change the directory to ``` frontend/171-final-frontend ```
``` bash
cd frontend/171-final-frontend
```
and run:
```bash
npm install
npm run dev
```
Then navigate to ```localhost:3000``` in your browser and the homepage should be visible.
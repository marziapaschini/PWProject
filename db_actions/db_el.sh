mongo --quiet --eval "
    db = db.getSiblingDB('MessaglyDB');
    db.dropDatabase();
"
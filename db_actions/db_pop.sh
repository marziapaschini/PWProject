#!/bin/bash
mongo --quiet --eval "
    db = db.getSiblingDB('MessaglyDB');
    db.users.insertOne({_id: 1, username: \"siwon407\", password: \"pw1\", name: \"Simon\", surname: \"Carell\", bio: \"Copywriter for ethical, substainable and purposed-led businesses. Desk plant killer.\"});
    db.users.insertOne({_id: 2, username: \"taeccool\", password: \"pw2\", name: \"Frank\", surname: \"Gramuglia\", bio: \"Travelling in Style on a Budget and Digital Nomad since '09.\"});
    db.users.insertOne({_id: 3, username: \"rvjono\", password: \"pw3\", name: \"Russell\", surname: \"Crowe\", bio: \"On a mission to help creators find their voices and make more reasonant work.\"});
    db.users.insertOne({_id: 4, username: \"onewayyoungsky\", password: \"pw4\", name: \"Bradley\", surname: \"Pitt\", bio: \"Hello! I am Bradley, a Scout + curator. Pinning daily the things that inspire!\"});
    db.users.insertOne({_id: 5, username: \"bestactionboy\", password: \"pw5\", name: \"Henry\", surname: \"Cavill\", bio: \"Drinking extra dirty martinis often (but not too often, things are fine)\"});
    db.users.insertOne({_id: 6, username: \"2amchangmin\", password: \"pw6\", name: \"George\", surname: \"Clooney\", bio: \"Free time? Follow my adventures!\"});
    db.users.insertOne({_id: 7, username: \"Khunnie0624\", password: \"pw7\", name: \"Francesco\", surname: \"Rossi\", bio: \"When we tell stories to others that have really helped us shape our thinking and way of life, we can have the same effect on them too. The brains of the person telling a story and listening to it can synchronize.\"});
    db.users.insertOne({_id: 8, username: \"Culturelounge\", password: \"pw8\", name: \"Natalie\", surname: \"Imbruglia\", bio: \"Dreaming about Hawaii.\"});
    db.users.insertOne({_id: 9, username: \"NYPark79\", password: \"pw9\", name: \"Teresa\", surname: \"Mannoia\", bio: \"Blogger, Keynote Speaker | Coffee addicted, sunshine lover & nuts about my 2 pups!\"});
    db.users.insertOne({_id: 10, username: \"KimQri\", password: \"pw10\", name: \"John\", surname: \"Michealson\", bio: \"Creating a life I love\"});
    db.users.insertOne({_id: 11, username: \"onewaychance\", password: \"pw11\", name: \"Stephen\", surname: \"Michealson\", bio: \"You is kind, you is smart, you is important\"});
    db.users.insertOne({_id: 12, username: \"missA_suzy\", password: \"pw12\", name: \"Nina\", surname: \"Michealson\", bio: \"Sassy, classy with a touch of badassy\"});
    db.users.insertOne({_id: 13, username: \"WGyenny\", password: \"pw13\", name: \"Klaus\", surname: \"Michealson\", bio: \"Always aiming to be a rainbow at the end of a thunderstorm.\"});
    db.users.find({}, {_id: 1, username: 1, password: 1, name: 1, surname: 1, date_of_birth: 1, bio: 1}).forEach(printjson);    
    print(\"The visualized collection is: users\");
"

echo -e "\n"
mongo --quiet --eval "
    db = db.getSiblingDB('MessaglyDB');
    db.followers.insertOne({_id: 1, follows: \"siwon407\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 2, follows: \"rvjono\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 3, follows: \"NYPark79\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 4, follows: \"siwon407\", isFollowed: \"missA_suzy\"});
    db.followers.insertOne({_id: 5, follows: \"NYPark79\", isFollowed: \"missA_suzy\"});
    db.followers.insertOne({_id: 6, follows: \"onewaychance\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 7, follows: \"WGyenny\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 8, follows: \"siwon407\", isFollowed: \"bestactionboy\"});
    db.followers.insertOne({_id: 9, follows: \"siwon407\", isFollowed: \"Culturelounge\"});
    db.followers.insertOne({_id: 10, follows: \"taeccool\", isFollowed: \"onewaychance\"});
    db.followers.insertOne({_id: 11, follows: \"siwon407\", isFollowed: \"WGyenny\"});
    db.followers.insertOne({_id: 12, follows: \"Khunnie0624\", isFollowed: \"2amchangmin\"});    
    db.followers.insertOne({_id: 13, follows: \"bestactionboy\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 14, follows: \"siwon407\", isFollowed: \"Khunnie0624\"});
    db.followers.insertOne({_id: 15, follows: \"2amchangmin\", isFollowed: \"Khunnie0624\"});
    db.followers.insertOne({_id: 16, follows: \"taeccool\", isFollowed: \"KimQri\"});
    db.followers.insertOne({_id: 17, follows: \"siwon407\", isFollowed: \"taeccool\"});
    db.followers.insertOne({_id: 18, follows: \"Culturelounge\", isFollowed: \"KimQri\"}); 
    db.followers.find({}, {_id: 1, follows: 1, isFollowed: 1}).forEach(printjson);
    print(\"The visualized collection is: followers\");
"
echo -e "\n"
mongo --quiet --eval "
    db = db.getSiblingDB('MessaglyDB');
    db.messages.insertOne({_id: 1, date: new Date(\"2022-10-17T19:13:38Z\"), text: \"It's no secret that we need to do more to protect the environment ??? and trees are one of our greatest allies! Their many benefits are often overlooked, but now is the time to show them some love. ???? What ways do you show your appreciation for trees? Like the post!\", author: \"siwon407\"});
    db.messages.insertOne({_id: 2, date: new Date(\"2021-02-02T10:23:00Z\"), text: \"Instagram can be seen as many things ??? fun, engaging, a source of inspiration ??? but useless?\", author: \"siwon407\"});
    db.messages.insertOne({_id: 3, date: new Date(\"2022-11-04T01:28:49Z\"), text: \"From Busan to Seoul, South Korea has an abundance of stunning regions! Each part of this amazing country offers its own unique culture and activities for visitors to explore.\", author: \"taeccool\"});
    db.messages.insertOne({_id: 4, date: new Date(\"2022-06-16T03:43:24Z\"), text: \"Ever wonder why we embrace the cold so much? The chilly weather actually does a lot of good for our bodies and minds!\", author: \"taeccool\"});
    db.messages.insertOne({_id: 5, date: new Date(\"2020-02-13T19:54:42Z\"), text: \"They may seem like they have nothing in common, but cats and raccoons are actually more similar than you think! Both can be found scurrying around at night, making mischief wherever they go. ????\", author: \"rvjono\"});
    db.messages.insertOne({_id: 6, date: new Date(\"2020-06-10T00:22:17Z\"), text: \"One of the biggest mysteries of the Great Barrier Reef are blue holes that can give researchers a rare look at ocean life and how we can protect it.\", author: \"rvjono\"});
    db.messages.insertOne({_id: 7, date: new Date(\"2020-06-25T02:00:55Z\"), text: \"Social Media Marketing Strategy: How to Thrive in a Changing World w/ @jaybaer ???? https://t.co/nLiErATOpY\", author: \"onewayyoungsky\"});
    db.messages.insertOne({_id: 8, date: new Date(\"2020-07-25T18:26:09Z\"), text: \"It took place during the summertime. Nobody wants to bask in ice water in winter, right? Summer also meant people had more time for fun and excitement.\", author: \"onewayyoungsky\"});
    db.messages.insertOne({_id: 9, date: new Date(\"2022-08-05T13:16:26Z\"), text: \"The campaign itself was for a cause. We want to take part in selfless acts that ???change the world??? because it makes us feel good about ourselves!\", author: \"bestactionboy\"});
    db.messages.insertOne({_id: 10, date: new Date(\"2022-11-07T11:15:45Z\"), text: \"Reasons for going viral: live streaming is raw and authentic and people love that.\", author: \"bestactionboy\"});
    db.messages.insertOne({_id: 11, date: new Date(\"2020-10-22T17:13:12Z\"), text: \"Dumb ways to die: which are them?\", author: \"Culturelounge\"});
    db.messages.insertOne({_id: 12, date: new Date(\"2021-02-04T12:05:33Z\"), text: \"Brilliant cover. This one will be an icon. Well done, NatGeo\", author: \"Khunnie0624\"});
    db.messages.insertOne({_id: 13, date: new Date(\"2021-06-21T08:03:58Z\"), text: \"On another social media, @KFC follows 11 people. Those 11 people? 5 Spice Girls and 6 guys named Herb. 11 Herbs and Spices. I need time to process this.\", author: \"2amchangmin\"});
    db.messages.insertOne({_id: 14, date: new Date(\"2021-04-07T18:47:32Z\"), text: \"Working similar time frames with similar break patterns has been helpful. I can be productive, yet give myself permission to step away from my home office guilt-free.\", author: \"Khunnie0624\"});
    db.messages.insertOne({_id: 15, date: new Date(\"2021-11-12T06:49:56Z\"), text: \"Part of consumers trust social media influencers over brands & Gen-Z and Millenials are 2X more likely than Boomers to trust influencers.\", author: \"Culturelounge\"});
    db.messages.insertOne({_id: 16, date: new Date(\"2021-03-25T23:52:32Z\"), text: \"GIFs are a great way to showcase your brand's personality, stay trendy, and have fun.\", author: \"NYPark79\"});
    db.messages.insertOne({_id: 17, date: new Date(\"2020-04-13T09:32:42Z\"), text: \"No matter where you live, holidays are a big deal.\", author: \"NYPark79\"});
    db.messages.insertOne({_id: 18, date: new Date(\"2020-02-17T01:27:14Z\"), text: \"Who doesn't love free stuff? Your audience will appreciate the free resources, whether it be ebooks, white papers, or other downloadable content. Put together a content bundle or a downloadable infographic, so your audience can use it for reference.\", author: \"WGyenny\"});
    db.messages.insertOne({_id: 19, date: new Date(\"2021-05-31T05:53:53Z\"), text: \"Sometimes reading content can be time-consuming, so give your audience's eyes a break and share a podcast episode. Even better, start your own!\", author: \"KimQri\"});
    db.messages.insertOne({_id: 20, date: new Date(\"2020-02-20T02:37:18Z\"), text: \"The great thing about the internet is that it's full of brilliant marketers sharing great information -- all for free.\", author: \"KimQri\"});
    db.messages.insertOne({_id: 21, date: new Date(\"2021-02-22T18:16:18Z\"), text: \"New Social Media Blog: Social Media Explorer, founded by Jason Falls, is constantly pumping out great posts on social media's impact on marketing and public relations.\", author: \"onewaychance\"});
    db.messages.insertOne({_id: 22, date: new Date(\"2021-03-18T16:56:51Z\"), text: \"Social Media Today offers a diverse mix of news on social networks' latest developments and cutting-edge tips to perfect your use of each platform. How to choose?\", author: \"onewaychance\"});
    db.messages.insertOne({_id: 23, date: new Date(\"2020-08-30T14:06:43Z\"), text: \"One of the best posts of all times: When Kim Kardashian West Got Called Out By Armani For Not Knowing How To Spell 'Giorgio'\", author: \"missA_suzy\"});
    db.messages.insertOne({_id: 24, date: new Date(\"2022-01-17T13:15:13Z\"), text: \"Not to spoil the surprise, but 8 out of the ten top-performing posts of the year featured this flipbook style.\", author: \"missA_suzy\"});
    db.messages.find({}, {_id: 1, date: 1, text: 1, author: 1}).forEach(printjson);
    print(\"The visualized collection is: messages\");
"
echo -e "\n"
mongo --quiet --eval "
    db = db.getSiblingDB('MessaglyDB');
    db.like.insertOne({_id: 1, username_user: \"NYPark79\", id_message: 1});
    db.like.insertOne({_id: 2, username_user: \"missA_suzy\", id_message: 1});
    db.like.insertOne({_id: 3, username_user: \"onewaychance\", id_message: 1});
    db.like.insertOne({_id: 4, username_user: \"KimQri\", id_message: 2});
    db.like.insertOne({_id: 5, username_user: \"Culturelounge\", id_message: 2});
    db.like.insertOne({_id: 6, username_user: \"2amchangmin\", id_message: 2});
    db.like.insertOne({_id: 7, username_user: \"bestactionboy\", id_message: 4});
    db.like.insertOne({_id: 8, username_user: \"onewayyoungsky\", id_message: 4});
    db.like.insertOne({_id: 9, username_user: \"rvjono\", id_message: 4});
    db.like.find({}, {_id: 1, username_user: 1, id_message: 1}).forEach(printjson);
    print(\"The visualized collection is: like\");
"
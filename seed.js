import prisma from "./src/config/prisma.js";
import bcrypt from "bcryptjs";
// import cloudinary from "cloudinary";
import cloudinary from "./src/config/cloudinary.js";
import upload from "./src/config/multer.js";


async function seed() {
  try {
    // Limpar dados
    await prisma.comment.deleteMany({});
    await prisma.like.deleteMany({});
    await prisma.savedPost.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.follower.deleteMany({});
    await prisma.user.deleteMany({});

    const passwordHash = await bcrypt.hash("123456", 10);

    // Usuários com avatarImage já pronto (Cloudinary URLs fixas)
    const usersData = [
      {
        name: "Hugo",
        username: "hugo",
        email: "hugo@example.com",
        password: passwordHash,
        isAdmin: true,
        avatarImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Passionate about technology and blogging."
      },
      {
        name: "Andrea",
        username: "andrea",
        email: "andrea@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Loves cats, coffee, and sharing moments."
      },
      {
        name: "Medusa",
        username: "medusa",
        email: "medusa@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Curious cat who loves naps and treats."
      },
      {
        name: "Patricia",
        username: "patricia",
        email: "patricia@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Nature lover and coffee enthusiast."
      },
      {
        name: "Rafaela",
        username: "rafaela",
        email: "rafaela@example.com",
        password: passwordHash,
        avatarImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        bio: "Bookworm and aspiring writer."
      },
    ];

    const createdUsers = [];
    for (const userData of usersData) {
      const user = await prisma.user.create({ data: userData });
      createdUsers.push(user);
    }

    const [hugo, andrea, medusa, patricia, rafaela] = createdUsers;

    // Posts com coverImage já pronto
    const postsContent = {
      hugo: [
        {
          title: "Dinner delight",
          content: "Today Andrea cooked dinner and it was delicious!",
          coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Lazy Medusa",
          content: "Medusa is sleeping on the sofa again, so lazy!",
          coverImage: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Family park walk",
          content: "Family walk in the park, perfect day.",
          coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      andrea: [
        {
          title: "Special breakfast",
          content: "Hugo made a special breakfast today, so sweet!",
          coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Cat mischief",
          content: "Medusa scratched my rug… but who can resist that look?",
          coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Movie night",
          content: "Movie night with the family, precious moments.",
          coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      medusa: [
        {
          title: "Purring time",
          content: "Purring on Andrea's lap, I love pets!",
          coverImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Waiting for treats",
          content: "Hugo forgot to give me treats… I will wait patiently.",
          coverImage: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Sun nap",
          content: "Sleeping in the sun, life as a cat is the best.",
          coverImage: "https://images.unsplash.com/photo-1508214751199-0c6c3f3c4f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      patricia: [
        {
          title: "Morning hike",
          content: "Enjoyed a refreshing hike in the hills!",
          coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Coffee time",
          content: "Trying a new coffee blend today, amazing aroma!",
          coverImage: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Nature photography",
          content: "Captured some beautiful landscapes this afternoon.",
          coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
      rafaela: [
        {
          title: "Book recommendation",
          content: "Just finished an amazing novel, highly recommend it!",
          coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Writing thoughts",
          content: "Spent the day writing in my journal, very therapeutic.",
          coverImage: "https://images.unsplash.com/photo-1496104679561-38b4c103f5d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
        {
          title: "Library afternoon",
          content: "Quiet afternoon at the library, love the peace here.",
          coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        },
      ],
    };

    // Criar posts e comentários
    for (const user of createdUsers) {
      const userPosts = postsContent[user.username];
      for (const postData of userPosts) {
        const post = await prisma.post.create({
          data: {
            title: postData.title,
            content: postData.content,
            coverImage: postData.coverImage,
            published: true,
            authorId: user.id,
          },
        });

        // Comentários dos outros usuários
        for (const commenter of createdUsers) {
          if (commenter.id !== user.id) {
            let commentText = "";
            if (user.username === "hugo") {
              commentText =
                commenter.username === "andrea"
                  ? "Glad you enjoyed it!"
                  : commenter.username === "medusa"
                  ? "Meow! 😸"
                  : "Sounds lovely!";
            } else if (user.username === "andrea") {
              commentText =
                commenter.username === "hugo"
                  ? "You deserve recognition!"
                  : commenter.username === "medusa"
                  ? "Purring along! 😻"
                  : "Amazing post!";
            } else if (user.username === "medusa") {
              commentText =
                commenter.username === "hugo"
                  ? "I will wait patiently! 😼"
                  : commenter.username === "andrea"
                  ? "Petting accepted! 😽"
                  : "So cute!";
            } else if (user.username === "patricia") {
              commentText =
                commenter.username === "hugo"
                  ? "Looks like a great hike!"
                  : commenter.username === "andrea"
                  ? "Beautiful scenery!"
                  : commenter.username === "medusa"
                  ? "Meow inspiration! 😺"
                  : "I want to join!";
            } else if (user.username === "rafaela") {
              commentText =
                commenter.username === "hugo"
                  ? "Nice book choice!"
                  : commenter.username === "andrea"
                  ? "Love your writing!"
                  : commenter.username === "medusa"
                  ? "Purrfect! 😻"
                  : "Interesting read!";
            }

            await prisma.comment.create({
              data: {
                content: commentText,
                authorId: commenter.id,
                postId: post.id,
              },
            });
          }
        }
      }
    }

    console.log("Database seeded with fixed Cloudinary images and new users Patricia and Rafaela!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
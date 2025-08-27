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
        avatarImage: "https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill/sample.jpg",
      },
      {
        name: "Andrea",
        username: "andrea",
        email: "andrea@example.com",
        password: passwordHash,
        avatarImage: "https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill/face_top.jpg",
      },
      {
        name: "Medusa",
        username: "medusa",
        email: "medusa@example.com",
        password: passwordHash,
        avatarImage: "https://res.cloudinary.com/demo/image/upload/w_200,h_200,c_fill/cat.jpg",
      },
    ];

    const createdUsers = [];
    for (const userData of usersData) {
      const user = await prisma.user.create({ data: userData });
      createdUsers.push(user);
    }

    const [hugo, andrea, medusa] = createdUsers;

    // Posts com coverImage já pronto
    const postsContent = {
      hugo: [
        {
          title: "Dinner delight",
          content: "Today Andrea cooked dinner and it was delicious!",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/dinner.jpg",
        },
        {
          title: "Lazy Medusa",
          content: "Medusa is sleeping on the sofa again, so lazy!",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/cat_sleep.jpg",
        },
        {
          title: "Family park walk",
          content: "Family walk in the park, perfect day.",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/park.jpg",
        },
      ],
      andrea: [
        {
          title: "Special breakfast",
          content: "Hugo made a special breakfast today, so sweet!",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/breakfast.jpg",
        },
        {
          title: "Cat mischief",
          content: "Medusa scratched my rug… but who can resist that look?",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/cat_play.jpg",
        },
        {
          title: "Movie night",
          content: "Movie night with the family, precious moments.",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/movie.jpg",
        },
      ],
      medusa: [
        {
          title: "Purring time",
          content: "Purring on Andrea's lap, I love pets!",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/purring.jpg",
        },
        {
          title: "Waiting for treats",
          content: "Hugo forgot to give me treats… I will wait patiently.",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/treats.jpg",
        },
        {
          title: "Sun nap",
          content: "Sleeping in the sun, life as a cat is the best.",
          coverImage: "https://res.cloudinary.com/demo/image/upload/w_600,h_400,c_fill/sun_nap.jpg",
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
                  : "Meow! 😸";
            } else if (user.username === "andrea") {
              commentText =
                commenter.username === "hugo"
                  ? "You deserve recognition!"
                  : "Purring along! 😻";
            } else if (user.username === "medusa") {
              commentText =
                commenter.username === "hugo"
                  ? "I will wait patiently! 😼"
                  : "Petting accepted! 😽";
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

    console.log("Database seeded with fixed Cloudinary images!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
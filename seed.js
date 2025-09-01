import prisma from "./src/config/prisma.js";
import bcrypt from "bcryptjs";
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
    surname: "Gigglepants",
    username: "hugo",
    email: "hugo@example.com",
    password: passwordHash,
    isAdmin: true,
    avatarImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Passionate about technology and blogging."
  },
  {
    name: "Andrea",
    surname: "Snickerdoodle",
    username: "andrea",
    email: "andrea@example.com",
    password: passwordHash,
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Loves cats, coffee, and sharing moments."
  },
  {
    name: "Medusa",
    surname: "Fluffykins",
    username: "medusa",
    email: "medusa@example.com",
    password: passwordHash,
    avatarImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Curious cat who loves naps and treats."
  },
  {
    name: "Patricia",
    surname: "Wobblebottom",
    username: "patricia",
    email: "patricia@example.com",
    password: passwordHash,
    avatarImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    bio: "Nature lover and coffee enthusiast."
  },
  {
    name: "Rafaela",
    surname: "Gigglemuffin",
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

    // Posts com conteúdo longo
const postsContent = {
  hugo: [
    {
      title: "Dinner delight",
      content: `
        <p>Today Andrea cooked dinner and it was <strong>absolutely amazing</strong>. The aroma filled the entire apartment, making everyone instantly hungry.</p>
        <p>We started with a <em>fresh garden salad</em>, tossed with a delicate vinaigrette, followed by a perfectly roasted chicken that was juicy and tender. Each bite was seasoned to perfection, highlighting the rich flavors of garlic, rosemary, and thyme.</p>
        <p>We ended the meal with a <strong>homemade chocolate mousse</strong>, light yet decadently sweet, which perfectly concluded the evening. It’s moments like these that make you appreciate the simple joys of life and the people we share them with.</p>
        <ul>
          <li>Fresh salad with vinaigrette</li>
          <li>Roasted chicken with herbs</li>
          <li>Chocolate mousse dessert</li>
        </ul>
      `,
      coverImage: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Lazy Medusa",
      content: `
        <p>Medusa has claimed the sofa once again. Her golden fur glows in the afternoon sunlight streaming through the window, and her soft purring creates a calming ambiance throughout the living room.</p>
        <p>She stretches, yawns, and curls into a perfect ball of fluff. Watching her relax reminds me of the importance of <em>taking time for ourselves</em>, embracing moments of stillness and comfort.</p>
        <p>Life as a cat is full of charm, each movement deliberate and expressive. Observing her brings a smile and reminds me to enjoy the simple pleasures.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Family park walk",
      content: `
        <p>We took a leisurely walk in the park today, and it was simply perfect.</p>
        <p>The trees swayed gently in the breeze, and the sun filtered through the leaves, casting playful shadows on the path. Children were laughing as they chased each other, dogs ran happily off-leash, and everyone seemed to share in the serenity of nature.</p>
        <p>It’s in these moments, away from screens and schedules, that you truly reconnect with family, friends, and yourself.</p>
        <ul>
          <li>Enjoyed nature and sunlight</li>
          <li>Watched children play</li>
          <li>Observed dogs running freely</li>
        </ul>
        <p>The simplicity of the day was its own luxury.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    },
  ],
  andrea: [
    {
      title: "Special breakfast",
      content: `
        <p>Hugo surprised me with a breakfast that felt like a scene out of a magazine.</p>
        <p>The table was set with <strong>fresh flowers</strong>, delicate porcelain plates, and the aroma of freshly brewed coffee. There were fluffy pancakes topped with strawberries, a side of scrambled eggs with herbs, and freshly squeezed orange juice.</p>
        <p>Sharing the meal, laughing, and enjoying the morning sun made me realize how small gestures can carry the deepest love and appreciation.</p>
        <p>For more inspiration, visit <a href="https://www.example.com">my food blog</a>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Cat mischief",
      content: `
        <p>Medusa decided to explore the living room today, leaving a trail of mischief everywhere.</p>
        <p>She clawed at the rug, knocked over a small vase, and chased a beam of sunlight across the floor. Her antics, though chaotic, were utterly charming.</p>
        <p>Watching her reminds me that curiosity and playfulness are essential, not just for cats but for humans too. Finding joy in small, unexpected moments is what life is truly about.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Movie night",
      content: `
        <p>We spent the evening watching classic movies. The living room was cozy, with blankets and soft lighting creating the perfect atmosphere.</p>
        <p>We shared snacks, laughed at funny scenes, and discussed our favorite parts. It wasn’t just about the movies—it was about connecting, reminiscing, and creating shared memories.</p>
        <p>These small traditions, though simple, are the threads that weave together the fabric of relationships.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1602021156377-1c64ed81b9b7?auto=format&fit=crop&w=600&q=80",
    },
  ],
  medusa: [
    {
      title: "Purring time",
      content: `
        <p>Curling up on Andrea's lap, I felt a wave of contentment as she petted me gently.</p>
        <p>The rhythmic motion of her hands, combined with the soft hum of her voice, made me purr loudly. It's in these quiet, intimate moments that I feel most connected to my humans.</p>
        <p>Life as a cat may seem simple, but the small joys—like warmth, affection, and trust—make every day meaningful.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Waiting for treats",
      content: `
        <p>I sat patiently by the kitchen door, hoping Hugo would remember the treats he promised.</p>
        <p>My tail swished back and forth as anticipation grew, eyes fixed on his every move. Patience, after all, is a virtue—even for a cat.</p>
        <p>Eventually, the reward arrived, and it was worth every second of the wait. Sometimes, the most satisfying moments are the ones we have to wait for, savoring the anticipation.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Sun nap",
      content: `
        <p>Basking in the afternoon sun, I felt the warmth seep into my fur, relaxing every muscle.</p>
        <p>The gentle sway of the trees outside created a natural lullaby, perfect for a nap. Life as a cat is full of these serene interludes, moments where nothing else matters but comfort and peace.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1606851090474-2e329e75e34e?auto=format&fit=crop&w=600&q=80",
    },
  ],
  patricia: [
    {
      title: "Morning yoga by the lake",
      content: `
        <p>The morning mist hovered gently over the lake as I unrolled my yoga mat on the soft grass. Each inhale carried the crisp scent of pine, and every exhale seemed to melt away layers of stress.</p>
        <p>Practicing <strong>sun salutations</strong> with the golden rays peeking through the trees filled me with a profound sense of gratitude. The birds sang as if to cheer me on, reminding me that nature itself celebrates stillness and movement alike.</p>
        <ul>
          <li>Deep stretches under the open sky</li>
          <li>Breathing exercises synced with the rhythm of water</li>
          <li>Moments of mindfulness surrounded by nature</li>
        </ul>
        <p>By the end of the session, my body felt alive and my spirit renewed. It was more than exercise—it was <em>a reminder that balance comes from within</em>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Homemade bread weekend",
      content: `
        <p>This weekend, I tried baking bread from scratch, and the experience was <strong>so rewarding</strong>. Kneading the dough felt almost therapeutic, and watching it rise by the window filled me with excitement.</p>
        <p>The smell of fresh bread filled the entire house, creating a warm and cozy atmosphere. When it came out of the oven, the crust was golden and crunchy, while the inside was soft and airy.</p>
        <ul>
          <li>Whole wheat loaf with sunflower seeds</li>
          <li>Garlic and rosemary focaccia</li>
          <li>Classic French baguette</li>
        </ul>
        <p>Sharing slices with butter and homemade jam made me realize how <em>small acts of creation can nourish not just the body, but also the soul</em>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1608198093002-ad4e005484f9?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "An evening of stargazing",
      content: `
        <p>Last night, I spread a blanket in the backyard and spent hours stargazing. The sky was so clear that I could see constellations I hadn’t noticed before.</p>
        <p>Armed with a small telescope and a notebook, I traced the outlines of Orion, Cassiopeia, and even spotted a shooting star. Each point of light felt like a <strong>whisper from the universe</strong>, reminding us how vast everything is.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1474511014065-42dcd2f0aa71?auto=format&fit=crop&w=600&q=80",
    },
  ],
  rafaela: [
    {
      title: "Painting with colors of the soul",
      content: `
        <p>Today, I set aside time to paint, letting colors flow freely across the canvas. Without a plan, I mixed bold reds, calming blues, and earthy greens, creating something that felt both chaotic and harmonious.</p>
        <p>The process reminded me that <strong>art isn’t about perfection</strong>, but about expression. Every brushstroke was a release, every shade a reflection of my feelings at that moment.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "A rainy afternoon read",
      content: `
        <p>The rain tapped softly on the windows as I curled up with a book and a cup of tea. The world outside seemed muted, but inside, the words on the page brought vibrant worlds to life.</p>
        <p>I dove into a novel filled with mystery and emotion, losing track of time as the characters’ stories unfolded. It felt like the <strong>perfect escape</strong>, a reminder that stories have the power to transport us.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Cooking with friends",
      content: `
        <p>This evening, I invited friends over for a cooking session. We chopped vegetables, laughed at our mistakes, and experimented with new recipes together.</p>
        <p>The kitchen was filled with chatter and delicious aromas. Each dish turned into a collaboration, and every flavor seemed to carry a story of friendship.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1531932755987-f95a88affea5?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

        for (const commenter of createdUsers) {
  if (commenter.id !== user.id) {
    let commentText = "";
    if (user.username === "hugo") {
      commentText =
        commenter.username === "andrea"
          ? "Wow Hugo, the dinner looks absolutely incredible! I can almost smell the roasted chicken and taste the chocolate mousse. You both must have had such a wonderful evening together!"
          : commenter.username === "medusa"
          ? "Meow! 😸 That chicken looks tempting even to a cat like me! I bet the chocolate mousse was the perfect sweet ending. Truly a delightful meal!"
          : "Hugo, this is amazing! I love how you described every detail of the dinner—it makes me feel like I was right there with you enjoying it.";
    } else if (user.username === "andrea") {
      commentText =
        commenter.username === "hugo"
          ? "Andrea, your breakfast looks like it came straight out of a gourmet magazine! I love the presentation and the thoughtfulness behind it. You really know how to make mornings special."
          : commenter.username === "medusa"
          ? "Purring along! 😻 The way you prepared breakfast makes me want to join and taste everything. Such a cozy and heartwarming moment!"
          : "This is amazing, Andrea! Your attention to detail and the way you set up the table shows so much care and love. I can almost feel the warmth of the morning.";
    } else if (user.username === "medusa") {
      commentText =
        commenter.username === "hugo"
          ? "Patience is a virtue, little kitty! 😼 I love how you wait so elegantly for your treats. Watching you must be so calming and adorable at the same time."
          : commenter.username === "andrea"
          ? "Petting accepted! 😽 Medusa, you are such a fluffy delight! I can imagine how peaceful and content you feel when cuddled."
          : "Absolutely adorable! I love seeing you bask in the sun and enjoy every little moment of comfort. Such a cozy life!";
    } else if (user.username === "patricia") {
      commentText =
        commenter.username === "hugo"
          ? "Patricia, your yoga session sounds so peaceful and rejuvenating! I can almost feel the breeze and hear the birds singing. What a perfect way to start the day!"
          : commenter.username === "andrea"
          ? "The scenery you described is stunning! Your mindfulness practice by the lake sounds like such a relaxing and grounding experience. I wish I could join you!"
          : commenter.username === "medusa"
          ? "Meow inspiration! 😺 Patricia, your calm and connection with nature is truly inspiring. I love how you captured the beauty of the morning."
          : "I really appreciate how detailed your post is, Patricia. It makes me want to grab a mat and follow your steps right now!";
    } else if (user.username === "rafaela") {
      commentText =
        commenter.username === "hugo"
          ? "Rafaela, your painting sounds so expressive and full of life! I love how you let colors guide your emotions and creativity. It must have been such a fulfilling session."
          : commenter.username === "andrea"
          ? "Your writing is beautiful! I can picture the rainy afternoon and feel the cozy atmosphere you created with your book and tea. What a delightful escape!"
          : commenter.username === "medusa"
          ? "Purrfect! 😻 I love the way you describe each moment with so much detail. I feel like I'm right there experiencing it with you."
          : "Such a wonderful read, Rafaela! Your cooking session sounds like so much fun and full of laughter. I can imagine the delicious smells and shared joy in the kitchen.";
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

    console.log("Database seeded with long blog-like posts!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
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
      coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Lazy Medusa",
      content: `
        <p>Medusa has claimed the sofa once again. Her golden fur glows in the afternoon sunlight streaming through the window, and her soft purring creates a calming ambiance throughout the living room.</p>
        <p>She stretches, yawns, and curls into a perfect ball of fluff. Watching her relax reminds me of the importance of <em>taking time for ourselves</em>, embracing moments of stillness and comfort.</p>
        <p>Life as a cat is full of charm, each movement deliberate and expressive. Observing her brings a smile and reminds me to enjoy the simple pleasures.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Cat mischief",
      content: `
        <p>Medusa decided to explore the living room today, leaving a trail of mischief everywhere.</p>
        <p>She clawed at the rug, knocked over a small vase, and chased a beam of sunlight across the floor. Her antics, though chaotic, were utterly charming.</p>
        <p>Watching her reminds me that curiosity and playfulness are essential, not just for cats but for humans too. Finding joy in small, unexpected moments is what life is truly about.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Movie night",
      content: `
        <p>We spent the evening watching classic movies. The living room was cozy, with blankets and soft lighting creating the perfect atmosphere.</p>
        <p>We shared snacks, laughed at funny scenes, and discussed our favorite parts. It wasn’t just about the movies—it was about connecting, reminiscing, and creating shared memories.</p>
        <p>These small traditions, though simple, are the threads that weave together the fabric of relationships.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      coverImage: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Waiting for treats",
      content: `
        <p>I sat patiently by the kitchen door, hoping Hugo would remember the treats he promised.</p>
        <p>My tail swished back and forth as anticipation grew, eyes fixed on his every move. Patience, after all, is a virtue—even for a cat.</p>
        <p>Eventually, the reward arrived, and it was worth every second of the wait. Sometimes, the most satisfying moments are the ones we have to wait for, savoring the anticipation.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Sun nap",
      content: `
        <p>Basking in the afternoon sun, I felt the warmth seep into my fur, relaxing every muscle.</p>
        <p>The gentle sway of the trees outside created a natural lullaby, perfect for a nap. Life as a cat is full of these serene interludes, moments where nothing else matters but comfort and peace.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1508214751199-0c6c3f3c4f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
        <p>For more on my journey, visit <a href="https://www.example.com/yoga">my wellness page</a>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1554311884-36d43d6d52b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
      coverImage: "https://images.unsplash.com/photo-1608198093002-ad4e005484f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "An evening of stargazing",
      content: `
        <p>Last night, I spread a blanket in the backyard and spent hours stargazing. The sky was so clear that I could see constellations I hadn’t noticed before.</p>
        <p>Armed with a small telescope and a notebook, I traced the outlines of Orion, Cassiopeia, and even spotted a shooting star. Each point of light felt like a <strong>whisper from the universe</strong>, reminding us how vast everything is.</p>
        <ul>
          <li>Orion’s Belt shining bright</li>
          <li>A glimpse of Jupiter through the telescope</li>
          <li>One magical shooting star</li>
        </ul>
        <p>I ended the evening filled with wonder, convinced that <em>the sky holds stories waiting for us to listen</em>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1474511014065-42dcd2f0aa71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ],
  rafaela: [
    {
      title: "Painting with colors of the soul",
      content: `
        <p>Today, I set aside time to paint, letting colors flow freely across the canvas. Without a plan, I mixed bold reds, calming blues, and earthy greens, creating something that felt both chaotic and harmonious.</p>
        <p>The process reminded me that <strong>art isn’t about perfection</strong>, but about expression. Every brushstroke was a release, every shade a reflection of my feelings at that moment.</p>
        <ul>
          <li>Experimented with acrylics on canvas</li>
          <li>Layered textures using a palette knife</li>
          <li>Added details inspired by nature</li>
        </ul>
        <p>By the end, I wasn’t just looking at a painting—I was looking at a <em>snapshot of my inner self</em>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "A rainy afternoon read",
      content: `
        <p>The rain tapped softly on the windows as I curled up with a book and a cup of tea. The world outside seemed muted, but inside, the words on the page brought vibrant worlds to life.</p>
        <p>I dove into a novel filled with mystery and emotion, losing track of time as the characters’ stories unfolded. It felt like the <strong>perfect escape</strong>, a reminder that stories have the power to transport us.</p>
        <ul>
          <li>A steaming cup of chamomile tea</li>
          <li>A thick blanket for warmth</li>
          <li>Rain providing the soundtrack</li>
        </ul>
        <p>Sometimes, the best journeys are the ones you take <em>without leaving your chair</em>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Cooking with friends",
      content: `
        <p>This evening, I invited friends over for a cooking session. We chopped vegetables, laughed at our mistakes, and experimented with new recipes together.</p>
        <p>The kitchen was filled with chatter and delicious aromas. Each dish turned into a collaboration, and every flavor seemed to carry a story of friendship.</p>
        <ul>
          <li>Spaghetti with homemade pesto</li>
          <li>Roasted veggies with balsamic glaze</li>
          <li>Berry tart for dessert</li>
        </ul>
        <p>Cooking together reminded me that <strong>food is about connection</strong>. It’s not just about eating—it’s about sharing, laughing, and making memories.</p>
        <p>For recipes, check out <a href="https://www.example.com/recipes">my cooking page</a>.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1529692236671-f1dc28a2aa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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

    console.log("Database seeded with long blog-like posts!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
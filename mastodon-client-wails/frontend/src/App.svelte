<script>
  import {onMount} from 'svelte'
  import {FetchPosts} from '../wailsjs/go/main/App.js'

  let posts = []

  onMount(async function() {
    const result = await FetchPosts();
    posts = result;
  })
</script>

<main>
  <div>
    {#each posts as post }
      <div>
        <article>
          <span>{@html post.content}</span>
        </article>
      </div>
    {/each}
  </div>
</main>

<style>
  article {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    margin: 4em 2em 4em 2em;
    border-radius: 25px;
  }
</style>

<template>
  <div class="rounded border-t border-gray-100 max-w-4xl mx-auto p-4 shadow-md">
    <div id="post">
      <div class="flex items-center gap-4 mb-6">
        <div>
          <p>Perfil</p>
        </div>
        <div>
          <h1 class="text-2xl">Título del post</h1>
          <p class="text-xs text-gray-600">Publicado por <span class="text-primary-color">Autor</span> (17 de agosto de
            2022, a las 20:11)</p>
        </div>
      </div>
      <div class="text-sm">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore consectetur dolor laudantium nulla amet
          tempora nostrum doloribus qui sapiente, earum quaerat, ratione sunt commodi at!</p>
        <p>Aca va una imagen
          <img src="https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?w=2000"
            alt="image">
        </p>
        <p>
          Probando otra imagen con un tamaño mas pequeño
          <img
            src="https://ecdn.teacherspayteachers.com/thumbitem/Examples-of-Big-and-Small-5033763-1573983223/original-5033763-1.jpg"
            alt="image">
        </p>
      </div>
    </div>

    <hr class="my-4">

    <!--Comments section-->
    <div class="comment-list">
      <h1 class="text-2xl">Comentarios ({{ nComments }}) :</h1>
      <div class="list-comments flex flex-col gap-5">
        <PostComment v-for="index in nComments" :key="'comment-'+index" :isReply="true">
          <PostComment />
        </PostComment>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PostComment from '@/components/PostComment.vue'

const nComments: number = 2
</script>
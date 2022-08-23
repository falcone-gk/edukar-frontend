<template>
  <div class="rounded border-t border-gray-100 max-w-4xl mx-auto p-4 shadow-md text-center">
    <h1 class="text-3xl mb-8">Nuevo Post</h1>
    <div>
      <form class="text-left">
        <div class="mb-4">
          <label class="label-control" for="course">Curso:</label>
          <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" name="course" id="course">
            <option v-for="(course, index) in courses" :value="index">{{ course }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="label-control" for="title">Título:</label>
          <input class="form-control" type="text" name="title" id="title">
        </div>
        <div class="mb-4">
          <label class="label-control" for="description">Descripción:</label>
          <QuillEditor />
        </div>
        <input class="btn-primary mt-2" type="submit" value="Publicar Post">
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const courses: string[] = ['Aritmética', 'Geometría', 'Trigonometría', 'Raz. Mat.']
</script>
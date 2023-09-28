<template>
  <div>
    <div
      class="rounded-tr-xl rounded-bl-xl border-4 border-gray-300 border-dashed flex flex-col justify-center items-center relative overflow-hidden"
      :class="{
        'border-secondary-500 text-secondary-500 fill-secondary-500': hover,
        'border-red-600 text-red-600 fill-red-600': errorMessage,
        'border-solid': view
      }"
      :style="{ width: width, height: height }"
      @drop="dropHandler"
      @dragover="dragOverHandler"
      @dragenter="dragEnterHandler"
      @dragleave="dragLeaveHandler"
    >
      <!-- Button events -->
      <input
        v-if="!view"
        type="file"
        class="absolute bottom-0 left-0 opacity-0 !w-full !h-full z-[2] cursor-pointer"
        :id="prefix"
        :accept="fileTypes.map(f => `.${f?.replace('.', '')}`).join(',')"
        @change="selectFileHandler"
        @mouseover="hover = true"
        @mouseleave="hover = false"
      />
      <!-- END Button events -->

      <div v-if="!view && hover" class="flex flex-col justify-center items-center absolute w-full h-full bg-white bg-opacity-90 z-[1]">
        <bnb-icon name="i-basil-cloud-upload-outline" size="56"></bnb-icon>
        <div class="font-semibold text-gray-500 text-center">Son permitidos los archivos {{ fileTypes.map(f => `.${f?.replace(".", "")}`).join(", ") }}</div>
      </div>

      <div v-if="!modelValue || !modelValue.base64 || modelValue.base64 == '' || modelValue.mimeType == ''" class="flex justify-center items-center flex-col">
        <bnb-icon :name="icon" class="fill-gray-400" size="56" :class="{ 'fill-gray-50': hover }"></bnb-icon>
        <div>{{ label }}</div>
        <div class="font-semibold text-gray-500 text-center">Son permitidos los archivos {{ fileTypes.map(f => `.${f?.replace(".", "")}`).join(", ") }}</div>
        <div class="font-semibold text-gray-500 text-center">Tamaño máximo permitido {{ getFilesizeText(props.sizeLimit) }}</div>
      </div>
      <div v-else class="flex flex-col align-center text-center max-w-full max-h-[calc(100%-40px)]">
        <img v-if="imageFileType == 'IMAGE'" class="max-w-full max-h-full object-cover" :src="`data:${modelValue.mimeType};base64,${modelValue.base64}`" />
        <div v-if="imageFileType != 'IMAGE'">
          <bnb-icon name="i-octicon-file-16" size="72" class="fill-primary-500 h-20"></bnb-icon>
        </div>
        <div class="font-semibold text-primary-700 text-center">{{ modelValue.name }}</div>
      </div>
      
    </div>
    <div v-if="errorMessage" class="px-3 py-1 text-red-600 text-sm">{{ errorMessage }}</div>

    <div v-if="props.modelValue?.base64" class="text-center">
      <bnb-button class="mt-3 px-5" color="secondary" variant="soft" @click="downloadFile">
        <bnb-icon name="i-material-symbols-download-sharp" size="24"></bnb-icon>
        <span class="ml-2">Descargar</span>
      </bnb-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

import mime from "mime";
import downloadjs from "downloadjs";

export interface IFile {
  name: string;
  mimeType?: string;
  extension?: string;
  base64: string;
};

const props = withDefaults(defineProps<{
  modelValue?: IFile;
  width?: string;
  height?: string;
  viewOnly?: boolean;
  icon?: string;
  label?: string;
  sizeLimit?: number;
  view?: boolean;
  fileTypes?: (string | null)[];
  isRequired?: boolean;
}>(), {
  width: "100px",
  height: "100px",
  viewOnly: true,
  icon: "i-ci-file-upload",
  label: "",
  sizeLimit: 1024 * 1024, // 1Mb
  view: false,
  fileTypes: () => ["jpg", "png", "gif"],
  isRequired: false,
});


const { value: currentFile, errorMessage } = useField<IFile>(`valueRef_${Math.floor(Math.random() * 10000000)}`, [
  (v) => !props.isRequired || !!v?.base64 || "La imagen es requerida"
]);


const prefix = `fileinput_${Math.round(Math.random() * 100000)}_${Math.round(Math.random() * 100000)}`;
const hover = ref(false);
const mimeTypes = ref<(string | null)[]>([]);

const messages = useMessages();


function getFilesizeText (val: number) {
  if (val < 1024) return `${val}BYTES`;
  val = Math.floor(val / 1024);
  if (val < 1024) return `${val}KB`;
  val = Math.floor(val / 1024);
  if (val < 1024) return `${val}MB`;
  val = Math.floor(val / 1024);
  return `${val}GB`;
}

function arrayToText (arr: (string | null)[]) {
  arr = arr.map(e => (e ?? "").replace(".", "").toUpperCase());
  if (arr.length > 1) {
    let firstList = arr.slice(0, arr.length - 1);
    let lastItem = arr[arr.length - 1];
    return firstList.join(", ") + " y " + lastItem;
  } else if (arr.length == 1) {
    return arr[0];
  } else {
    return "";
  }
}

function cancelEvent(event: Event) {
  event.preventDefault();
}

// Drag/drop events
async function dropHandler(event: DragEvent) {
  event.preventDefault();

  if (event?.dataTransfer?.items) {
    await handleDropFiles(event.dataTransfer.items as unknown as FileList, true);
  } else {
    await handleDropFiles(event.dataTransfer?.files as FileList, false);
  }
}

function dragOverHandler(event: Event) {
  event.preventDefault();

  hover.value = true;
}

function dragEnterHandler(event: Event) {
  event.preventDefault();

  hover.value = true;
}

function dragLeaveHandler(event: Event) {
  event.preventDefault();

  hover.value = false;
}

async function selectFileHandler(event: Event) {
  event.preventDefault();

  await handleSelectedFiles((event.target as HTMLInputElement).files as FileList);
  removeFileData(event);
}

function downloadFile() {
  if (props.modelValue?.base64)
    downloadjs(`data:${props.modelValue.mimeType};base64,${props.modelValue.base64}`, props.modelValue.name, props.modelValue.mimeType);
}


/* AUXILIAR FUNCTIONS */
function removeDragData (event: DragEvent) {
  if (event.dataTransfer?.items) {
    event.dataTransfer.items.clear();
  } else {
    event.dataTransfer?.clearData();
  }
}

function removeFileData (event: Event) {
  (event.target as HTMLInputElement).value = "";
}

async function getFileBase64 (file: File) {
  const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  }).then((base64: unknown) => {
    if (base64 == "") return "";

    let base64Split = (base64 as string).split(";base64,");
    if (base64Split.length > 1) return base64Split[1];

    return base64Split[0];
  });

  return await toBase64(file);
}


/* HANDLERS */
async function handleSelectedFiles (selectedFiles: FileList) {
  let invalidFileType = false;
  let fileSizeLimit = false;

  if (selectedFiles.length > 0) {

    if (mimeTypes.value.indexOf(selectedFiles[0].type) === -1) {
      invalidFileType = true;
    } else if (selectedFiles[0].size > props.sizeLimit) {
      fileSizeLimit = true;
    } else {
      currentFile.value = {
        name: selectedFiles[0].name,
        mimeType: selectedFiles[0].type,
        extension: mime.getExtension(selectedFiles[0].type) ?? "",
        base64: await getFileBase64(selectedFiles[0])
      };
    }

    if (invalidFileType) messages.showError(`Sólo son válidos los archivos en formato: ${arrayToText(props.fileTypes)}.`);
    if (fileSizeLimit) messages.showError(`El tamaño del archivo excede al permitido (${getFilesizeText(props.sizeLimit)}).`);

  }
}

async function handleDropFiles (selectedFiles: FileList, inItem = false) {
  let invalidFileType = false;
  let fileSizeLimit = false;

  if (selectedFiles.length > 0) {
    if (mimeTypes.value.indexOf(selectedFiles[0].type) === -1 || (selectedFiles[0] as any).kind !== 'file') {
      invalidFileType = true;
    } else if (selectedFiles[0].size > props.sizeLimit) {
      fileSizeLimit = true;
    } else {
      let fileData = inItem ? (selectedFiles[0] as any).getAsFile() : selectedFiles[0];
      
      currentFile.value = {
        name: fileData.name,
        mimeType: fileData.type,
        extension: mime.getExtension(fileData.type) ?? "",
        base64: await getFileBase64(fileData)
      };
    }

    if (invalidFileType) messages.showError(`Sólo son válidos los archivos en formato: ${arrayToText(props.fileTypes)}.`);
    if (fileSizeLimit) messages.showError(`El tamaño del archivo excede al permitido (${getFilesizeText(props.sizeLimit)}).`);

  }
}



const emit = defineEmits<{
  (event: "update:modelValue", value: IFile): void
}>();


watch(currentFile, (val: IFile) => emit("update:modelValue", val));

onMounted(() => { if (props.modelValue) currentFile.value = props.modelValue });

const imageFileType = computed(() => {
  if (!props.modelValue || typeof props.modelValue === "undefined") {
    return "";
  }

  let stringName = props.modelValue.name ? props.modelValue.name.split(".") : "";
  if (stringName.length <= 1) {
    return "";
  }

  let fileType = stringName[stringName.length - 1].toUpperCase();
  switch(fileType) {
    case "JPG":
    case "JPEG":
    case "GIF":
    case "PNG":
    case "WEBP":
    case "HEIC":
      fileType = "IMAGE";
      break;
    default:
      fileType = "";
  }

  return fileType;
});


onMounted(() => {
  window.addEventListener("dragover", cancelEvent);
  window.addEventListener("drop", cancelEvent);
  mimeTypes.value = props.fileTypes.map(e => mime.getType(e as string));
});

onUnmounted(() => {
  window.removeEventListener("dragover", cancelEvent);
  window.removeEventListener("drop", cancelEvent);
});
</script>

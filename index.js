// gallery.js

// 여기에 본인의 그림 정보를 직접 입력하세요.
// 'src'는 Github 저장소의 이미지 파일 경로를 나타냅니다.
let galleryData = [
  // 여기에 작품 정보를 추가하세요.
  // 예시:
  {
    src: "art1.jpg",
    title: "도깨비와 축제",
    desc: "어릴 적 처음으로 그렸던 그림입니다.",
    tags: ["수채화", "추억"],
  },
];

let gallery = document.getElementById("gallery");
let emptyState = document.getElementById("empty");
let searchInput = document.getElementById("search-input");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let lightboxCap = document.getElementById("lightbox-cap");
let lightboxClose = document.getElementById("lightbox-close");

function updateEmptyState(){
  emptyState.classList.toggle("hidden", galleryData.length > 0);
}

function createCard(item, index) {
  let card = document.createElement("div");
  card.className = "card";
  
  let thumb = document.createElement("div");
  thumb.className = "thumb";
  let img = document.createElement("img");
  img.src = item.src;
  img.alt = item.title || "작품";
  thumb.appendChild(img);
  
  thumb.addEventListener("click", () => {
    lightboxImg.src = item.src;
    lightboxCap.textContent = item.title || "";
    lightbox.classList.add("open");
  });
  
  card.appendChild(thumb);

  let meta = document.createElement("div");
  meta.className = "meta";
  
  let title = document.createElement("h3");
  title.textContent = item.title || "제목 없음";
  meta.appendChild(title);
  
  let desc = document.createElement("p");
  desc.textContent = item.desc || "설명 없음";
  meta.appendChild(desc);

  let tagRow = document.createElement("div");
  tagRow.className = "row";
  (item.tags || []).forEach(t => {
    let tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = t;
    tag.addEventListener("click", () => {
      searchInput.value = t;
      filterGallery();
    });
    tagRow.appendChild(tag);
  });
  meta.appendChild(tagRow);

  card.appendChild(meta);
  
  return card;
}

function renderGallery(data) {
  gallery.innerHTML = "";
  if (data.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    data.forEach((item, i) => {
      gallery.appendChild(createCard(item, i));
    });
    emptyState.classList.add("hidden");
  }
}

function filterGallery() {
  let val = searchInput.value.toLowerCase();
  let filtered = galleryData.filter(item =>
    (item.title || "").toLowerCase().includes(val) ||
    (item.desc || "").toLowerCase().includes(val) ||
    (item.tags || []).some(t => t.toLowerCase().includes(val))
  );
  renderGallery(filtered);
}

searchInput.addEventListener("input", filterGallery);
lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
});
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
  }
});


renderGallery(galleryData);


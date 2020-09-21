<template>
  <footer>
    <span>
      Zernonia @ DevChallenges.io
    </span>
  </footer>
</template>

<style>
footer {
  margin-top: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
footer span {
  font-weight: 600;
  font-size: clamp(12px, 4vw , 14px);
  color: #A9A9A9;
  width: 30%;
  border-top: 1px solid #A9A9A9;
  text-align: center;
  padding: 2rem;
}
@media screen and (max-width: 768px){
footer span {
  width: 60%;
}
}
</style>
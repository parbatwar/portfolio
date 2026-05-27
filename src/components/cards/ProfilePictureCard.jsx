function ProfilePictureCard() {
  return (
    <div className="w-full h-full min-h-[300px] bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
      <img 
        src="/bhattay_dai.jpg" 
        alt="Profile" 
        className="w-full h-full flex-1 object-cover object-top grayscale hover:grayscale-0 transition-all duration-500 block"
      /> 
    </div>
  );
}
export default ProfilePictureCard;
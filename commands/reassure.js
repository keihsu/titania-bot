module.exports = {
  name: 'reassure',
  description: 'Responds with a random reassuring message.',
  execute(message) {
    const messages = [
      "We're so proud of you, you're amazing.",
      "Try your best, we know you can do it.",
      "You will get through this, hang in there.",
      "Think happy thoughts.",
      "Today something good will happen.",
      "You have the best smile, use it as often as you can.",
      "Believe in yourself, you can totally do this.",
      "It's okay to make mistakes.",
      "There, there.",
      "Mhmm, keep going. I'm listening",
      "Don't worry, everything will be better.",
      "Hang in there. I believe in you!",
      "Sometimes, the most productive thing you can do is relax.",
      "Yeah, I totally understand.",
      "Sticks and stones may br... oh my, please don't use those words... 🥺",
      "In trouble to be troubled is to have your trouble doubled.",
      "Your true abilities will reveal themselves when you are in a time of trouble.",
      "You'll attract the right things when you have sense.",
      "Trouble is a place where you find yourself when your judgement malfunctions.",
      "I'm trying to see things from your point of view, but I can't stick my head that far up your... tree trunk.",
    ];
    if(!message.content.startsWith('!unmute') && !message.content.startsWith('!mute')){
      return message.channel.send(messages[Math.floor(Math.random() * messages.length)]);
    }
  }
}
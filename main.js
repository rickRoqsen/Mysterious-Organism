// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}
console.log(mockUpStrand())

const pAequorFactory = (number, dnaBases) => {
  return {
    specimenNum : number,
    dna : dnaBases,

    // similute a mutation (Randomly selects a base in object's dna property and changes the current base to a different base)
    mutate() {
      console.log(`Mutating specimen${this.specimenNum}, with bases: ${this.dna}`)
      let randIndex = Math.floor(Math.random() * this.dna.length)
      console.log("Base to change at index: " + randIndex); 
      let newBase = returnRandBase()
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase()
      }
      this.dna[randIndex] = newBase
      return this.dna
    },
    // Compares dna of different organisms
    compareDNA (otherOrganism) {
      baseCounter = 0;
      console.log(`Comparing DNA strands of ${this.specimenNum} with base ${this.dna} to ${otherOrganism.specimenNum} with base ${otherOrganism.dna}`)
      for (let i = 0; i < this.dna.length; i++){
        let mainOrg = this.dna[i]
        let otherOrg = otherOrganism.dna[i]
        if (mainOrg === otherOrg) {
          baseCounter += 1
        }
      }
      const commonPercentage = Math.round((baseCounter/this.dna.length) * 100)
      console.log(`specimen ${this.specimenNum}and specimen ${otherOrganism.specimenNum} have ${commonPercentage}% DNA in common`)
    },
    
    // Checks organism's chance of survival
    willLikelySurvive () {
      let CBases = 0
      let GBases = 0
      for ( let i = 0; i < this.dna.length; i++){
        if (this.dna[i] =='C') {
          CBases++
        }
        if (this.dna[i] == 'G') {
          GBases++
        }
      }
      const percentageCBase = Math.round((CBases/this.dna.length)*100)
      const percentageGBase = Math.round((GBases/this.dna.length)*100)
      if (percentageCBase >= 60 || percentageGBase >= 60) {
        return true
      } else { return false}
    }
  }
}

// Organisms for tests
let org = pAequorFactory(2, mockUpStrand())
// console.log(org.mutate())

let orgA = pAequorFactory(4, mockUpStrand()) 

//30 instances
let i = 1
surviveOrg = []
while (surviveOrg.length < 30) {
  let pAequor = pAequorFactory(i, mockUpStrand())
  if (pAequor.willLikelySurvive() === true) {
    surviveOrg.push(pAequor)
  }
  i++
}
console.log(surviveOrg)
  












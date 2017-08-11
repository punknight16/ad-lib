var data = {
	adlibs: [
		{id: 0, string: 'The quick sly fox jumped over the lazy dog'}
	],
  templates: [
    {id: 0, adlib: function(adjective, noun1, noun2, person_you_know){return (person_you_know + " went "+ noun2 +" shopping, but was interrupted by a "+ adjective +" "+noun1+".")}},
    {id: 1, adlib: function(adjective, noun1, noun2, person_you_know){return (person_you_know + " won the " + adjective + " contest by balancing a "+noun1+" on a "+noun2 +".")}},
    {id: 2, adlib: function(adjective, noun1, noun2, person_you_know){return (person_you_know + " created a " +noun1+" by squeezing a "+adjective + " "+noun2 +" fiercly.")}}
  ]
};

module.exports = data;
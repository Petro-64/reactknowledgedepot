const helpers = {
    UrlSniffer: function(){
        return (window.location.host.includes('localhost') || window.location.host.includes('127.0.0.1')) ? 'http://127.0.0.1:8000/' : 'http://knowledgedepot.ca/';
    },

    X_CSRF_TOKEN: function(){
        if(document.getElementsByTagName("meta")[2] !== undefined){
            return document.getElementsByTagName("meta")[2].content;
        }
    },

    FilterBySubjectsAndSort: function(initialResults, activeSubjects, sortingOption){
        let filteredBySubjects = initialResults.filter(function (result) { return (activeSubjects.includes(result.subjectName))});
            switch(sortingOption) {
            case "1":
                filteredBySubjects.sort((a, b) => a.createdAt > b.createdAt ? 1:-1);
                break;
            case "2":
                filteredBySubjects.sort((a, b) => a.createdAt < b.createdAt ? 1:-1);
                break;
            case "3":
                filteredBySubjects.sort((a, b) => a.quality > b.quality ? 1:-1);
                break;
            case "4":
                filteredBySubjects.sort((a, b) => a.quality < b.quality ? 1:-1);
                break;
            case "5":
                filteredBySubjects.sort((a, b) => a.subjectName > b.subjectName ? 1:-1);
                break;
            case "6":
                filteredBySubjects.sort((a, b) => a.subjectName < b.subjectName ? 1:-1);
                break;
            default:
                filteredBySubjects.sort((a, b) => a.createdAt > b.createdAt ? -1:1);
            }
            
            return filteredBySubjects;
        },

        PaginatedResults: function(filteredBySubjectsAndSort, resultsFilterPerPage, resultsFilterPaginationNumber){
            return filteredBySubjectsAndSort.filter(function(result, index){ 
                return (index >= resultsFilterPerPage*resultsFilterPaginationNumber) && (index < resultsFilterPerPage*(resultsFilterPaginationNumber + 1))
            });
        },

        SimplePaginatedResults: function(items, itemsPerPage, currentPagination){
            return items.filter(function(result, index){ 
                return (index >= itemsPerPage*(currentPagination - 1)) && (index < itemsPerPage*(currentPagination))
            });
        },

        makeRandom: function (){
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 7; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
}

export default helpers;


using MediatR;
using Domain;
using Persistence;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Activities{

    public class List
    {
        public class Query : IRequest<List<Activity>>{}

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
           
            public Handler(DataContext context){
                _context = context;
            
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationtoken){

                return await _context.Activities.ToListAsync(cancellationtoken);
            }
        }
    }
}